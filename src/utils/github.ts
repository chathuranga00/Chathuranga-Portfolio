export interface GitHubRepoApiResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  private: boolean;
  archived?: boolean;
}

export type GitHubLanguagesApiResponse = Record<string, number>;

export interface ProcessedRepo {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  stars: number;
  forks: number;
  updatedAt: string;
  languages: string[];
}

export class GitHubRateLimitError extends Error {
  resetTimeFormatted: string;
  resetTimestamp: number;

  constructor(resetTimestamp: number) {
    const date = new Date(resetTimestamp * 1000);
    const resetTimeFormatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    super(`GitHub API rate limit exceeded. Resets at ${resetTimeFormatted}.`);
    this.name = 'GitHubRateLimitError';
    this.resetTimestamp = resetTimestamp;
    this.resetTimeFormatted = resetTimeFormatted;
  }
}

const CACHE_PREFIX = 'gh_featured_repos_cache_';
const CACHE_TIME_PREFIX = 'gh_featured_repos_time_';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const REQUEST_TIMEOUT_MS = 7500; // 7.5 seconds

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(options.headers || {}),
      },
    });
    return response;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Request timed out while contacting GitHub API.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchSingleRepoWithLanguages(
  username: string,
  repoName: string
): Promise<ProcessedRepo | null> {
  const repoUrl = `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}`;

  const repoRes = await fetchWithTimeout(repoUrl);

  // Check rate limits
  const remaining = repoRes.headers.get('x-ratelimit-remaining');
  const resetHeader = repoRes.headers.get('x-ratelimit-reset');

  if ((repoRes.status === 403 || repoRes.status === 429) && remaining === '0') {
    const resetTs = resetHeader ? parseInt(resetHeader, 10) : Math.floor(Date.now() / 1000) + 3600;
    throw new GitHubRateLimitError(resetTs);
  }

  // 404: Repo not found or private — skip quietly
  if (repoRes.status === 404) {
    return null;
  }

  if (!repoRes.ok) {
    throw new Error(`Failed to fetch repo ${repoName}: HTTP ${repoRes.status}`);
  }

  let repoData: GitHubRepoApiResponse;
  try {
    repoData = (await repoRes.json()) as GitHubRepoApiResponse;
  } catch {
    throw new Error(`Failed to parse JSON for repo ${repoName}`);
  }

  // Fetch languages
  let languages: string[] = [];
  try {
    const langUrl = `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/languages`;
    const langRes = await fetchWithTimeout(langUrl);

    if (langRes.ok) {
      const langData = (await langRes.json()) as GitHubLanguagesApiResponse;
      // Sort languages by byte count descending and pick top 3
      languages = Object.entries(langData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);
    }
  } catch {
    // If languages fail or are rate-limited, continue with empty or minimal array
    languages = [];
  }

  // Format updated date (e.g. Nov 2026 or DD MMM YYYY)
  const updatedDate = new Date(repoData.updated_at);
  const formattedDate = updatedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    id: repoData.id,
    name: repoData.name,
    description: repoData.description || 'No description provided.',
    htmlUrl: repoData.html_url,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    updatedAt: formattedDate,
    languages,
  };
}

export async function fetchFeaturedGitHubRepos(
  username: string,
  featuredRepoNames: string[],
  forceRefresh: boolean = false
): Promise<{
  repos: ProcessedRepo[];
  rateLimitResetTime: string | null;
}> {
  if (!username || featuredRepoNames.length === 0) {
    return { repos: [], rateLimitResetTime: null };
  }

  const cacheKey = `${CACHE_PREFIX}${username}_${featuredRepoNames.sort().join('_')}`;
  const cacheTimeKey = `${CACHE_TIME_PREFIX}${username}_${featuredRepoNames.sort().join('_')}`;

  // Check sessionStorage cache (unless force refreshing)
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(cacheKey);
      const cachedTime = sessionStorage.getItem(cacheTimeKey);

      if (cached && cachedTime) {
        const age = Date.now() - parseInt(cachedTime, 10);
        if (age < CACHE_TTL_MS) {
          const parsed = JSON.parse(cached) as ProcessedRepo[];
          return { repos: parsed, rateLimitResetTime: null };
        }
      }
    } catch {
      // Ignore sessionStorage read errors and fetch from network
    }
  }

  // Use Promise.allSettled so one 404 or network failure doesn't break the entire list
  const results = await Promise.allSettled(
    featuredRepoNames.map((repoName) => fetchSingleRepoWithLanguages(username, repoName))
  );

  let detectedRateLimitError: GitHubRateLimitError | null = null;
  const repos: ProcessedRepo[] = [];
  let hasGenericError = false;

  for (const res of results) {
    if (res.status === 'fulfilled') {
      if (res.value !== null) {
        repos.push(res.value);
      }
    } else {
      if (res.reason instanceof GitHubRateLimitError) {
        detectedRateLimitError = res.reason;
      } else {
        hasGenericError = true;
      }
    }
  }

  // If rate-limited across calls and no repos could be retrieved, rethrow
  if (detectedRateLimitError && repos.length === 0) {
    throw detectedRateLimitError;
  }

  // If all failed with generic error and no repos returned, rethrow
  if (hasGenericError && repos.length === 0) {
    throw new Error('Failed to load selected GitHub repositories. Please try again.');
  }

  // Save successful result into sessionStorage
  if (typeof window !== 'undefined' && repos.length > 0) {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(repos));
      sessionStorage.setItem(cacheTimeKey, Date.now().toString());
    } catch {
      // Storage quota or disabled storage ignored
    }
  }

  return { repos, rateLimitResetTime: null };
}
