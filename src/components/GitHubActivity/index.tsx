import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  RefreshCw,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Activity,
  Flame,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ActivityHeader } from './ActivityHeader';
import { YearRow } from './YearRow';
import { useGitHubContributions } from '@/hooks/useGitHubContributions';
import { profileData } from '@/data/profile';

export const GitHubActivity: React.FC = () => {
  const { data, status, errorMessage, rateLimitResetTime, retry } = useGitHubContributions();
  const shouldReduceMotion = useReducedMotion();
  const [showAllYears, setShowAllYears] = useState(false);

  const initialYearsLimit = 3;
  const username = profileData.githubUsername;

  // Strictly filter out 2025 (only display active years, excluding 2025)
  const filteredYears = (data?.years || []).filter((y) => y.year !== 2025);

  const yearsToDisplay = showAllYears
    ? filteredYears
    : filteredYears.slice(0, initialYearsLimit);

  const hasEarlierYears = filteredYears.length > initialYearsLimit;

  // Re-calculate totals matching only active/displayed years
  const displayTotalContributions = filteredYears.reduce(
    (acc, curr) => acc + curr.totalContributions,
    0
  );
  const displayYearsActive = Math.max(1, filteredYears.length);

  return (
    <section id="activity" className="py-24 sm:py-32 bg-bg relative">
      <Container size="xl">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            label="Engineering Consistency"
            title="Activity & Contributions."
            description="Multi-year GitHub activity matrix fetched directly from the public GitHub contribution graph. Demonstrates software engineering cadence, active coding streaks, and continuous version control."
            className="mb-0"
          />

          <div className="flex items-center gap-3 shrink-0">
            {status !== 'loading' && (
              <Button
                variant="outline"
                size="sm"
                onClick={retry}
                iconLeft={<RefreshCw size={13} />}
                aria-label="Refresh GitHub contribution statistics"
              >
                Sync Activity
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              iconRight={<ExternalLink size={13} />}
            >
              GitHub Graph
            </Button>
          </div>
        </div>

        {/* 1. Loading State: Skeleton Terminal Card */}
        {status === 'loading' && (
          <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-md overflow-hidden animate-pulse">
            <div className="p-6 sm:p-8 border-b border-border/80">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="h-3 w-40 bg-border rounded ml-2" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-border shrink-0" />
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-border rounded" />
                    <div className="h-4 w-64 bg-border rounded" />
                    <div className="h-3 w-36 bg-border rounded" />
                  </div>
                </div>
                <div className="h-14 w-44 bg-border rounded-xl" />
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="h-5 w-40 bg-border rounded" />
              <div className="h-28 w-full bg-border/40 rounded-xl" />
            </div>
          </div>
        )}

        {/* 2. Rate-Limited State */}
        {status === 'rateLimited' && (
          <Card className="p-8 sm:p-12 text-center border-yellow-500/30 bg-yellow-500/5">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shadow-glow-sm">
              <Clock size={28} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-copy mb-3">
              Contribution Feed Temporarily Throttled
            </h3>
            <p className="text-copy-secondary text-sm sm:text-base max-w-lg mx-auto mb-6">
              {errorMessage ||
                'The public contribution API limit has been reached from this IP. Contributions will refresh automatically.'}
              {rateLimitResetTime && (
                <span className="block mt-2 font-mono text-xs text-yellow-400">
                  Expected window reset: {rateLimitResetTime}
                </span>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="md" onClick={retry} iconLeft={<RefreshCw size={14} />}>
                Try Again
              </Button>
              <Button
                variant="outline"
                size="md"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={<ExternalLink size={14} />}
              >
                View on GitHub Profile
              </Button>
            </div>
          </Card>
        )}

        {/* 3. Error State */}
        {status === 'error' && (
          <Card className="p-8 sm:p-12 text-center border-red-500/30 bg-red-500/5">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-glow-sm">
              <AlertCircle size={28} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-copy mb-3">
              Unable to Retrieve Contribution History
            </h3>
            <p className="text-copy-secondary text-sm sm:text-base max-w-lg mx-auto mb-6">
              {errorMessage || 'A network error occurred while querying the GitHub activity graph.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="md" onClick={retry} iconLeft={<RefreshCw size={14} />}>
                Retry Sync
              </Button>
              <Button
                variant="outline"
                size="md"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={<ExternalLink size={14} />}
              >
                Check GitHub Profile Directly
              </Button>
            </div>
          </Card>
        )}

        {/* 4. Empty State */}
        {status === 'empty' && (
          <Card className="p-8 sm:p-12 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-card border border-border flex items-center justify-center text-copy-secondary">
              <Activity size={28} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-copy mb-3">
              No Public Contributions Recorded
            </h3>
            <p className="text-copy-secondary text-sm sm:text-base max-w-lg mx-auto mb-6">
              No public commits or contributions were found for @{username}. New commits pushed to GitHub will appear here automatically.
            </p>
            <Button
              variant="outline"
              size="md"
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              iconRight={<ExternalLink size={14} />}
            >
              Visit GitHub Profile
            </Button>
          </Card>
        )}

        {/* 5. Success State: Terminal Activity Card */}
        {status === 'success' && data && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-3xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-2xl"
          >
            {/* Profile Bar Header */}
            <ActivityHeader
              user={data.user}
              totalContributions={displayTotalContributions || data.totalContributions}
              yearsActive={displayYearsActive}
            />

            {/* Multi-Year Heatmap Stack */}
            <div>
              {yearsToDisplay.map((yearData, idx) => (
                <YearRow
                  key={yearData.year}
                  yearData={yearData}
                  isFirst={idx === 0}
                />
              ))}
            </div>

            {/* Toggle earlier years if > 3 years exist */}
            {hasEarlierYears && (
              <div className="p-4 bg-card/40 border-t border-border/80 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllYears(!showAllYears)}
                  iconRight={showAllYears ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                >
                  {showAllYears
                    ? 'Show Fewer Years'
                    : `Show Earlier Years (${data.years.length - initialYearsLimit} More)`}
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Integrity Source Footnote */}
        <div className="mt-8 p-4 rounded-2xl bg-card/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-copy-secondary">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-orange-400 shrink-0" />
            <span>
              Public contributions only. Live data sourced from{' '}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent font-medium text-copy"
              >
                GitHub
              </a>{' '}
              via open contribution graph metrics. Cached locally for 1 hour.
            </span>
          </div>
          <Badge variant="outline" size="sm">
            NO INVENTED DATA
          </Badge>
        </div>
      </Container>
    </section>
  );
};

export default GitHubActivity;
