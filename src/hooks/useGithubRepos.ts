import { useState, useEffect, useCallback } from 'react';
import {
  fetchFeaturedGitHubRepos,
  type ProcessedRepo,
  GitHubRateLimitError,
} from '@/utils/github';
import { profileData } from '@/data/profile';

export type GitHubFetchStatus = 'loading' | 'success' | 'empty' | 'error' | 'rateLimited';

export interface UseGitHubReposReturn {
  repos: ProcessedRepo[];
  status: GitHubFetchStatus;
  rateLimitResetTime: string | null;
  errorMessage: string | null;
  retry: () => void;
}

export function useGithubRepos(): UseGitHubReposReturn {
  const [repos, setRepos] = useState<ProcessedRepo[]>([]);
  const [status, setStatus] = useState<GitHubFetchStatus>('loading');
  const [rateLimitResetTime, setRateLimitResetTime] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const username = profileData.githubUsername;
  const featuredRepos = profileData.featuredRepos;

  const loadRepos = useCallback(
    async (force: boolean = false) => {
      setStatus('loading');
      setErrorMessage(null);
      setRateLimitResetTime(null);

      if (!username || !featuredRepos || featuredRepos.length === 0) {
        setRepos([]);
        setStatus('empty');
        return;
      }

      try {
        const result = await fetchFeaturedGitHubRepos(username, featuredRepos, force);

        if (result.repos.length === 0) {
          setRepos([]);
          setStatus('empty');
        } else {
          setRepos(result.repos);
          setStatus('success');
        }
      } catch (err: unknown) {
        if (err instanceof GitHubRateLimitError) {
          setStatus('rateLimited');
          setRateLimitResetTime(err.resetTimeFormatted);
          setErrorMessage(err.message);
        } else if (err instanceof Error) {
          setStatus('error');
          setErrorMessage(err.message);
        } else {
          setStatus('error');
          setErrorMessage('An unexpected network error occurred while reaching GitHub.');
        }
      }
    },
    [username, featuredRepos]
  );

  useEffect(() => {
    loadRepos(false);
  }, [loadRepos]);

  const retry = useCallback(() => {
    loadRepos(true);
  }, [loadRepos]);

  return {
    repos,
    status,
    rateLimitResetTime,
    errorMessage,
    retry,
  };
}
