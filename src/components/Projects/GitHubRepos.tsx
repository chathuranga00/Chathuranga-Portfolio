import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GitFork,
  Star,
  ExternalLink,
  FolderGit2,
  AlertCircle,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { GithubIcon } from '@/components/common/BrandIcons';
import { profileData } from '@/data/profile';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const username = profileData.githubUsername;
  const CACHE_KEY = `gh_repos_${username}`;
  const CACHE_TIME_KEY = `gh_repos_time_${username}`;
  const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

  const fetchRepositories = async (force: boolean = false) => {
    setLoading(true);
    setError(null);
    setIsRateLimited(false);

    // 1. Check SessionStorage Cache
    if (!force) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
        if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
          setRepos(JSON.parse(cached));
          setLoading(false);
          return;
        }
      } catch (e) {
        // Fallback to network on storage failure
      }
    }

    // 2. Fetch from Public GitHub REST API
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.status === 403) {
        setIsRateLimited(true);
        setError('GitHub API rate limit exceeded for public requests. Please check back shortly or visit GitHub directly.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(`Unable to retrieve repositories (Status: ${response.status}).`);
        setLoading(false);
        return;
      }

      const data: GitHubRepo[] = await response.json();
      setRepos(data);

      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch (e) {}
    } catch (err) {
      setError('Network connection error while fetching live repositories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [username]);

  return (
    <div className="mt-16 sm:mt-20 pt-16 border-t border-border/80">
      {/* Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GithubIcon size={16} className="text-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Live GitHub Sync // @{username}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-copy">
            Public Repositories
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchRepositories(true)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-mono text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors disabled:opacity-50"
            title="Refresh from GitHub API"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            <span>Sync</span>
          </button>

          <a
            href={profileData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-copy-secondary hover:text-accent transition-colors"
          >
            <span>View Full Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-6 rounded-2xl bg-card border border-border animate-pulse space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-28 bg-card-hover rounded" />
                <div className="h-3 w-12 bg-card-hover rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-card-hover rounded" />
                <div className="h-3 w-4/5 bg-card-hover rounded" />
              </div>
              <div className="h-3 w-16 bg-card-hover rounded pt-2" />
            </div>
          ))}
        </div>
      )}

      {/* Rate Limited State */}
      {!loading && isRateLimited && (
        <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
          <Clock size={28} className="text-accent mx-auto" />
          <Badge variant="outline" size="sm">
            GITHUB RATE LIMIT REACHED
          </Badge>
          <p className="text-xs text-copy-secondary max-w-md mx-auto">
            {error}
          </p>
          <a
            href={profileData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline pt-1"
          >
            <span>Browse @{username} on GitHub</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}

      {/* General Error State */}
      {!loading && !isRateLimited && error && (
        <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
          <AlertCircle size={28} className="text-red-400 mx-auto" />
          <p className="text-xs text-copy-secondary">{error}</p>
          <button
            type="button"
            onClick={() => fetchRepositories(true)}
            className="text-xs font-mono text-accent hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty Repositories State */}
      {!loading && !error && repos.length === 0 && (
        <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-3">
          <FolderGit2 size={32} className="text-copy-muted mx-auto" />
          <p className="text-sm font-semibold text-copy">No Public Repositories Found</p>
          <p className="text-xs text-copy-secondary">
            Repositories for @{username} are being configured or remain private.
          </p>
        </div>
      )}

      {/* Populated Repositories Grid */}
      {!loading && !error && repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : idx * 0.05 }}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <Card
                  variant="interactive"
                  padding="md"
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-copy group-hover:text-accent transition-colors font-display font-bold text-base truncate">
                        <FolderGit2 size={16} className="text-accent shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ExternalLink size={14} className="text-copy-muted group-hover:text-accent shrink-0 ml-2" />
                    </div>

                    <p className="text-xs text-copy-secondary leading-relaxed line-clamp-2 mb-4">
                      {repo.description || 'Public repository code and system assets.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-copy-muted">
                    <span className="text-copy-secondary">
                      {repo.language || 'Codebase'}
                    </span>
                    <div className="flex items-center gap-3">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-accent" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork size={12} />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
