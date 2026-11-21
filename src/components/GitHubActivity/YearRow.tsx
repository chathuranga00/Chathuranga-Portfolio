import React from 'react';
import { Flame, Calendar, CheckCircle2 } from 'lucide-react';
import { YearContributionData } from '@/utils/githubContributions';
import { formatNumber } from '@/utils/contributionStats';
import { ContributionGrid } from './ContributionGrid';

interface YearRowProps {
  yearData: YearContributionData;
  isFirst: boolean;
}

export const YearRow: React.FC<YearRowProps> = ({ yearData, isFirst }) => {
  // Explicitly guarantee 2025 is never displayed
  if (yearData.year === 2025) return null;

  return (
    <div
      className={`p-6 sm:p-8 ${
        isFirst ? '' : 'border-t border-border/80'
      } bg-card/20 hover:bg-card/30 transition-colors`}
    >
      {/* Year Metric Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="font-display text-xl sm:text-2xl font-bold text-copy">
            {yearData.year}
          </span>
          <span className="text-border">·</span>
          <span className="text-sm font-mono font-medium text-copy">
            <strong className="text-accent">{formatNumber(yearData.totalContributions)}</strong> Contributions
          </span>
          <span className="text-border hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-copy-secondary">
            <CheckCircle2 size={14} className="text-accent" />
            <span>{yearData.activeDays} Active Days</span>
          </span>
          {yearData.longestStreak > 0 && (
            <>
              <span className="text-border hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-medium">
                <Flame size={13} className="text-orange-400" />
                <span>{yearData.longestStreak}-Day Streak</span>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-copy-secondary">
          <Calendar size={13} className="text-accent" />
          <span>Jan 1 – Dec 31</span>
        </div>
      </div>

      {/* Heatmap Matrix */}
      <ContributionGrid yearData={yearData} />
    </div>
  );
};
