import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  RefreshCw,
  Clock,
  AlertCircle,
  FolderGit2,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { GithubIcon } from '@/components/common/BrandIcons';
import { RepoCard } from './RepoCard';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { profileData } from '@/data/profile';

export const GitHubSection: React.FC = () => {
  const { repos, status, rateLimitResetTime, errorMessage, retry } = useGithubRepos();
  const shouldReduceMotion = useReducedMotion();

  const username = profileData.githubUsername;

  return (
    <section id="github" className="py-24 sm:py-32 bg-bg relative">
      <Container size="xl">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            label="Live GitHub Feed"
            title="Open Source & Code."
            description="Selected repositories pulled directly from the public GitHub REST API. Demonstrates code structure, language breakdowns, and continuous version control."
            className="mb-0"
          />

          <div className="flex items-center gap-3 shrink-0">
            {status !== 'loading' && (
              <Button
                variant="outline"
                size="sm"
                onClick={retry}
                iconLeft={<RefreshCw size={13} />}
                aria-label="Refresh repository list from GitHub API"
              >
                Sync
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              href={profileData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              iconLeft={<GithubIcon className="w-3.5 h-3.5 text-copy" />}
              iconRight={<ExternalLink size={13} />}
            >
              @{username}
            </Button>
          </div>
        </div>

        {/* 1. Loading State: Skeleton Cards */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border animate-pulse space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 bg-card-hover rounded-xl" />
                  <div className="h-4 w-16 bg-card-hover rounded-md" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-5 w-3/4 bg-card-hover rounded-md" />
                  <div className="h-3 w-full bg-card-hover rounded-md" />
                  <div className="h-3 w-5/6 bg-card-hover rounded-md" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-5 w-14 bg-card-hover rounded-full" />
                  <div className="h-5 w-16 bg-card-hover rounded-full" />
                </div>
                <div className="pt-4 border-t border-border/80 flex justify-between items-center">
                  <div className="h-3 w-20 bg-card-hover rounded" />
                  <div className="h-7 w-24 bg-card-hover rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Rate-Limited State */}
        {status === 'rateLimited' && (
          <Card variant="default" padding="lg" className="text-center py-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <Clock size={32} />
              </div>
              <Badge variant="outline" size="sm" hasDot>
                GITHUB API RATE LIMIT
              </Badge>
              <h3 className="text-xl font-bold font-display text-copy">
                Public Rate Limit Reached
              </h3>
              <p className="text-sm text-copy-secondary leading-relaxed max-w-md">
                GitHub permits 60 unauthenticated requests per hour. The quota will reset at{' '}
                <span className="font-mono text-accent font-semibold">
                  {rateLimitResetTime || 'the start of the next hour'}
                </span>
                . In the meantime, you can explore repositories directly on GitHub.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="primary"
                  href={profileData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  iconRight={<ExternalLink size={14} />}
                >
                  Explore Repositories on GitHub
                </Button>
                <Button variant="outline" onClick={retry} iconLeft={<RefreshCw size={14} />}>
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* 3. Error State */}
        {status === 'error' && (
          <Card variant="default" padding="lg" className="text-center py-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertCircle size={32} />
              </div>
              <Badge variant="outline" size="sm">
                NETWORK SYNCHRONIZATION ERROR
              </Badge>
              <h3 className="text-xl font-bold font-display text-copy">
                Failed to Retrieve Repositories
              </h3>
              <p className="text-sm text-copy-secondary max-w-md">
                {errorMessage || 'A network error occurred while contacting the GitHub API.'}
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <Button variant="primary" onClick={retry} iconLeft={<RefreshCw size={14} />}>
                  Retry Connection
                </Button>
                <Button
                  variant="outline"
                  href={profileData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  iconRight={<ExternalLink size={14} />}
                >
                  Visit GitHub
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* 4. Empty State (When no repos match or all are private) */}
        {status === 'empty' && (
          <Card variant="default" padding="lg" className="text-center py-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3.5 rounded-2xl bg-card border border-border text-accent">
                <FolderGit2 size={32} />
              </div>
              <Badge variant="outline" size="sm">
                SELECTED CODEBASES
              </Badge>
              <h3 className="text-xl font-bold font-display text-copy">
                No Public Repositories Found
              </h3>
              <p className="text-sm text-copy-secondary max-w-md">
                None of the specified featured repositories are currently public under @{username}. You can explore all public repositories directly on GitHub.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  href={profileData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  iconRight={<ExternalLink size={14} />}
                >
                  View GitHub Profile
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* 5. Success State: Populated Repositories Grid */}
        {status === 'success' && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: 'easeOut',
                }}
              >
                <RepoCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Live Integrity & Cache Note */}
        <div className="mt-12 p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-copy-secondary">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-accent shrink-0" />
            <span>
              Real-time synchronization via public GitHub REST API with 1-hour sessionStorage cache to minimize API calls.
            </span>
          </div>
          <Badge variant="outline" size="sm">
            NO HARDCODED FAKE REPOS
          </Badge>
        </div>
      </Container>
    </section>
  );
};

export default GitHubSection;
