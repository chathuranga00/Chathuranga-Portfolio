/**
 * GitHub Contributions & Profile Data Service
 * Fetches real-world public contributions from Jog Gruber's contributions API
 * and official profile metadata from GitHub REST API.
 * All responses are cached in sessionStorage for 1 hour to protect rate limits.
 */

export interface GitHubProfileUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  created_at: string;
  public_repos: number;
}

export interface ContributionDay {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface RawContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export interface YearContributionData {
  year: number;
  totalContributions: number;
  activeDays: number;
  longestStreak: number;
  days: ContributionDay[];
}

export interface FullContributionData {
  user: GitHubProfileUser;
  totalContributions: number;
  yearsActive: number;
  years: YearContributionData[];
}

export class GitHubRateLimitError extends Error {
  resetTime: Date | null;
  constructor(message: string, resetTime: Date | null = null) {
    super(message);
    this.name = 'GitHubRateLimitError';
    this.resetTime = resetTime;
  }
}

export class GitHubUserNotFoundError extends Error {
  constructor(username: string) {
    super(`GitHub user "${username}" was not found.`);
    this.name = 'GitHubUserNotFoundError';
  }
}

const CACHE_PREFIX = 'gh_contrib_v6_';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CacheEnvelope {
  timestamp: number;
  data: FullContributionData;
}

/**
 * Helper to execute a fetch with an AbortController timeout
 */
async function fetchWithTimeout(url: string, timeoutMs = 8000, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (err: unknown) {
    clearTimeout(id);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms: ${url}`);
    }
    throw err;
  }
}

/**
 * Calculates the longest consecutive streak of days with count > 0 in a chronological list of days
 */
function computeLongestStreak(days: ContributionDay[]): number {
  let longest = 0;
  let current = 0;

  for (const day of days) {
    if (day.count > 0) {
      current++;
      if (current > longest) {
        longest = current;
      }
    } else {
      current = 0;
    }
  }

  return longest;
}

/**
 * Primary API entry point.
 * Fetches contributions and GitHub profile data, aggregates year-by-year statistics,
 * and caches results in sessionStorage.
 */
export async function getContributionData(
  username: string,
  bypassCache = false
): Promise<FullContributionData> {
  const cleanUsername = username.trim();
  if (!cleanUsername || cleanUsername === 'YOUR_GITHUB_USERNAME') {
    throw new Error('Please configure a valid GitHub username in src/data/profile.ts');
  }

  const cacheKey = `${CACHE_PREFIX}${cleanUsername.toLowerCase()}`;

  // 1. Check sessionStorage cache
  if (!bypassCache && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      // Purge any legacy cache keys (e.g. v1 through v5)
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith('gh_contrib_') && k !== cacheKey) {
          sessionStorage.removeItem(k);
        }
      }

      const cachedStr = sessionStorage.getItem(cacheKey);
      if (cachedStr) {
        const envelope: CacheEnvelope = JSON.parse(cachedStr);
        if (Date.now() - envelope.timestamp < CACHE_TTL_MS) {
          // Explicitly ensure 2025 is excluded from any cached data
          envelope.data.years = (envelope.data.years || []).filter((y) => y.year !== 2025);
          return envelope.data;
        }
      }
    } catch {
      // Ignore cache parse errors and proceed to fetch
    }
  }

  // 2. Fetch Contributions and Profile in parallel
  const contributionsUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(cleanUsername)}?y=all`;
  const profileUrl = `https://api.github.com/users/${encodeURIComponent(cleanUsername)}`;

  const [contribRes, profileRes] = await Promise.allSettled([
    fetchWithTimeout(contributionsUrl, 8500),
    fetchWithTimeout(profileUrl, 8500, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }),
  ]);

  // Handle Contributions Response
  if (contribRes.status === 'rejected') {
    throw new Error(`Failed to load contribution data: ${contribRes.reason instanceof Error ? contribRes.reason.message : String(contribRes.reason)}`);
  }

  const cRes = contribRes.value;
  if (!cRes.ok) {
    if (cRes.status === 400 || cRes.status === 404) {
      throw new GitHubUserNotFoundError(cleanUsername);
    }
    if (cRes.status === 403 || cRes.status === 429) {
      throw new GitHubRateLimitError('Contribution API rate limit reached. Please try again shortly.');
    }
    throw new Error(`Contribution service responded with HTTP status ${cRes.status}`);
  }

  let rawContrib: RawContributionsResponse;
  try {
    rawContrib = (await cRes.json()) as RawContributionsResponse;
  } catch {
    throw new Error('Received malformed JSON from contributions service.');
  }

  if (!rawContrib || !rawContrib.contributions || !Array.isArray(rawContrib.contributions)) {
    throw new Error('Invalid contribution data format received.');
  }

  // Handle Profile Response
  let userProfile: GitHubProfileUser;
  if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
    try {
      const pData = (await profileRes.value.json()) as {
        login: string;
        name: string | null;
        avatar_url: string;
        html_url: string;
        bio: string | null;
        followers: number;
        following: number;
        created_at: string;
        public_repos: number;
      };
      userProfile = {
        login: pData.login || cleanUsername,
        name: pData.name,
        avatar_url: pData.avatar_url || `https://github.com/${cleanUsername}.png`,
        html_url: pData.html_url || `https://github.com/${cleanUsername}`,
        bio: pData.bio,
        followers: typeof pData.followers === 'number' ? pData.followers : 0,
        following: typeof pData.following === 'number' ? pData.following : 0,
        created_at: pData.created_at || new Date().toISOString(),
        public_repos: typeof pData.public_repos === 'number' ? pData.public_repos : 0,
      };
    } catch {
      userProfile = createDefaultProfile(cleanUsername);
    }
  } else {
    // If GitHub API rate limits or errors, gracefully build fallback profile with standard avatar
    userProfile = createDefaultProfile(cleanUsername);
  }

  // 3. Process Contributions by Year
  // Group days by year
  const daysByYear = new Map<number, ContributionDay[]>();

  for (const day of rawContrib.contributions) {
    if (!day || !day.date) continue;
    const year = parseInt(day.date.split('-')[0], 10);
    // Exclude 2025 as requested
    if (isNaN(year) || year === 2025) continue;

    if (!daysByYear.has(year)) {
      daysByYear.set(year, []);
    }
    daysByYear.get(year)!.push(day);
  }

  // Compute stats per year
  const processedYears: YearContributionData[] = [];
  let grandTotalContributions = 0;

  // Sort years descending (newest first)
  const sortedYearKeys = Array.from(daysByYear.keys()).sort((a, b) => b - a);

  for (const year of sortedYearKeys) {
    const days = daysByYear.get(year)!;
    // Sort days chronologically ascending
    days.sort((a, b) => a.date.localeCompare(b.date));

    // Calculate metrics
    let totalYearContrib = 0;
    let activeDays = 0;

    for (const d of days) {
      totalYearContrib += d.count;
      if (d.count > 0) {
        activeDays++;
      }
    }

    // Fallback to jogruber total if given, otherwise computed sum
    const officialYearTotal = rawContrib.total && typeof rawContrib.total[String(year)] === 'number'
      ? rawContrib.total[String(year)]
      : totalYearContrib;

    const longestStreak = computeLongestStreak(days);

    grandTotalContributions += officialYearTotal;

    processedYears.push({
      year,
      totalContributions: officialYearTotal,
      activeDays,
      longestStreak,
      days,
    });
  }

  // Active years count
  const yearsActive = Math.max(1, processedYears.length);

  const finalData: FullContributionData = {
    user: userProfile,
    totalContributions: grandTotalContributions,
    yearsActive,
    years: processedYears,
  };

  // 4. Save to sessionStorage
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const envelope: CacheEnvelope = {
        timestamp: Date.now(),
        data: finalData,
      };
      sessionStorage.setItem(cacheKey, JSON.stringify(envelope));
    } catch {
      // Ignore sessionStorage quota exceeded errors
    }
  }

  return finalData;
}

function createDefaultProfile(username: string): GitHubProfileUser {
  return {
    login: username,
    name: username,
    avatar_url: `https://github.com/${username}.png`,
    html_url: `https://github.com/${username}`,
    bio: null,
    followers: 0,
    following: 0,
    created_at: new Date().toISOString(),
    public_repos: 0,
  };
}
