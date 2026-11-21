import { useState, useEffect, useCallback } from 'react';
import {
  FullContributionData,
  getContributionData,
  GitHubRateLimitError,
} from '@/utils/githubContributions';
import { profileData } from '@/data/profile';

export type ContributionStatus = 'loading' | 'success' | 'empty' | 'error' | 'rateLimited';

export interface UseGitHubContributionsResult {
  data: FullContributionData | null;
  status: ContributionStatus;
  errorMessage: string | null;
  rateLimitResetTime: string | null;
  retry: () => void;
}

export function useGitHubContributions(): UseGitHubContributionsResult {
  const [data, setData] = useState<FullContributionData | null>(null);
  const [status, setStatus] = useState<ContributionStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<string | null>(null);

  const username = profileData.githubUsername;

  const loadContributions = useCallback(
    async (bypassCache = false) => {
      setStatus('loading');
      setErrorMessage(null);
      setRateLimitResetTime(null);

      try {
        const result = await getContributionData(username, bypassCache);

        if (!result.years || result.years.length === 0 || result.totalContributions === 0) {
          setData(result);
          setStatus('empty');
          return;
        }

        setData(result);
        setStatus('success');
      } catch (err: unknown) {
        if (err instanceof GitHubRateLimitError) {
          setStatus('rateLimited');
          setErrorMessage(err.message);
          if (err.resetTime) {
            setRateLimitResetTime(
              err.resetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
          }
        } else if (err instanceof Error) {
          setStatus('error');
          setErrorMessage(err.message);
        } else {
          setStatus('error');
          setErrorMessage('An unexpected error occurred while fetching contributions.');
        }
      }
    },
    [username]
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      loadContributions(false);
    }

    return () => {
      isMounted = false;
    };
  }, [loadContributions]);

  const retry = useCallback(() => {
    loadContributions(true);
  }, [loadContributions]);

  return {
    data,
    status,
    errorMessage,
    rateLimitResetTime,
    retry,
  };
}
