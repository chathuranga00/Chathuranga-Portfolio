import React from 'react';
import { ExternalLink, Users, Calendar, Award } from 'lucide-react';
import { GitHubProfileUser } from '@/utils/githubContributions';
import { formatNumber } from '@/utils/contributionStats';
import { GithubIcon } from '@/components/common/BrandIcons';
import { Badge } from '@/components/common/Badge';

interface ActivityHeaderProps {
  user: GitHubProfileUser;
  totalContributions: number;
  yearsActive: number;
}

export const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  user,
  totalContributions,
  yearsActive,
}) => {
  return (
    <div className="p-6 sm:p-8 border-b border-border/80 bg-card/40">
      {/* Decorative macOS Window Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
          <span className="ml-2 text-xs font-mono text-copy-secondary hidden sm:inline">
            terminal@github:~/{user.login}/activity
          </span>
        </div>

        <Badge variant="accent" size="sm" className="font-mono text-[11px]">
          LIVE CONTRIBUTION GRAPH
        </Badge>
      </div>

      {/* Main Profile Info & Summary Stats */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Avatar & User Metadata */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative group shrink-0">
            <img
              src={user.avatar_url}
              alt={`${user.name || user.login}'s GitHub avatar`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-border group-hover:border-accent transition-colors shadow-md"
              loading="lazy"
              width="80"
              height="80"
            />
            <div className="absolute -bottom-1 -right-1 p-1 bg-bg rounded-lg border border-border shadow-sm">
              <GithubIcon className="w-3.5 h-3.5 text-copy" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-copy truncate">
                {user.name || user.login}
              </h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-copy-secondary hover:text-accent font-mono transition-colors"
                aria-label={`View ${user.login} on GitHub (opens in new tab)`}
              >
                @{user.login}
                <ExternalLink size={12} />
              </a>
            </div>

            {user.bio ? (
              <p className="text-xs sm:text-sm text-copy-secondary mt-1 max-w-xl line-clamp-2">
                {user.bio}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-copy-secondary mt-1">
                Software Developer · Public Code & Open Source Contributions
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-copy-secondary font-mono">
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-accent" />
                <strong className="text-copy font-semibold">{user.followers}</strong> followers
              </span>
              <span className="text-border">·</span>
              <span>
                <strong className="text-copy font-semibold">{user.following}</strong> following
              </span>
              <span className="text-border">·</span>
              <span>
                <strong className="text-copy font-semibold">{user.public_repos}</strong> public repos
              </span>
            </div>
          </div>
        </div>

        {/* Right: Cumulative Metrics */}
        <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto p-4 rounded-xl bg-bg/60 border border-border/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-copy-secondary">
                Total Contributions
              </p>
              <p className="font-display text-xl sm:text-2xl font-bold text-copy">
                {formatNumber(totalContributions)}
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-border/80" />

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-card text-copy border border-border">
              <Calendar size={20} className="text-copy-secondary" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-copy-secondary">
                Active Span
              </p>
              <p className="font-display text-xl sm:text-2xl font-bold text-copy">
                {yearsActive} {yearsActive === 1 ? 'Year' : 'Years'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
