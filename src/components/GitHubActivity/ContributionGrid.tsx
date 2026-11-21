import React, { useRef, useEffect, useState } from 'react';
import { ContributionDay, YearContributionData } from '@/utils/githubContributions';
import {
  groupDaysIntoWeeks,
  getMonthLabels,
  getCellColorClass,
  formatContributionDate,
} from '@/utils/contributionStats';

interface ContributionGridProps {
  yearData: YearContributionData;
}

interface HoveredCellState {
  day: ContributionDay;
  x: number;
  y: number;
}

export const ContributionGrid: React.FC<ContributionGridProps> = ({ yearData }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<HoveredCellState | null>(null);

  // Group days into 53 weeks (columns) x 7 days (rows: Sunday=0 to Saturday=6)
  const weeks = groupDaysIntoWeeks(yearData.days);
  const monthLabels = getMonthLabels(weeks);

  // Auto-scroll to the rightmost month on mobile/smaller screens so current/recent days are in view
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [yearData.year]);

  return (
    <div className="relative">
      {/* Horizontally scrollable container */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label={`GitHub contribution heatmap for year ${yearData.year}. Use arrow keys or scroll to explore.`}
        className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-lg"
      >
        <div className="min-w-[760px] inline-block select-none">
          {/* Month Labels Header */}
          <div className="flex text-[11px] font-mono text-copy-secondary mb-2 pl-8">
            <div className="grid grid-flow-col auto-cols-[14px] gap-[3px]">
              {weeks.map((_, colIdx) => {
                const labelObj = monthLabels.find((m) => m.colIndex === colIdx);
                return (
                  <div key={colIdx} className="w-[14px] text-left">
                    {labelObj ? (
                      <span className="font-semibold text-copy">{labelObj.label}</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid Area with Day Labels */}
          <div className="flex items-start gap-2">
            {/* Day of Week Labels (Mon, Wed, Fri) */}
            <div className="flex flex-col gap-[3px] text-[10px] font-mono text-copy-secondary pr-1 pt-0 shrink-0 select-none">
              <span className="h-[14px] leading-[14px] invisible">Sun</span>
              <span className="h-[14px] leading-[14px]">Mon</span>
              <span className="h-[14px] leading-[14px] invisible">Tue</span>
              <span className="h-[14px] leading-[14px]">Wed</span>
              <span className="h-[14px] leading-[14px] invisible">Thu</span>
              <span className="h-[14px] leading-[14px]">Fri</span>
              <span className="h-[14px] leading-[14px] invisible">Sat</span>
            </div>

            {/* 53 Columns of 7 Rows */}
            <div
              role="grid"
              aria-label={`Contributions in ${yearData.year}`}
              className="grid grid-flow-col auto-cols-[14px] gap-[3px]"
            >
              {weeks.map((week, colIdx) => (
                <div key={colIdx} role="row" className="flex flex-col gap-[3px]">
                  {week.map((day, rowIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${rowIdx}`}
                          className="w-[14px] h-[14px] rounded-[3px] bg-transparent pointer-events-none"
                          aria-hidden="true"
                        />
                      );
                    }

                    const formattedDate = formatContributionDate(day.date);
                    const tooltipText = `${day.count} ${
                      day.count === 1 ? 'contribution' : 'contributions'
                    } on ${formattedDate}`;

                    return (
                      <button
                        key={day.date}
                        type="button"
                        role="gridcell"
                        aria-label={tooltipText}
                        tabIndex={0}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                        onFocus={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onBlur={() => setHoveredCell(null)}
                        className={`w-[14px] h-[14px] rounded-[3px] transition-transform duration-100 hover:scale-125 focus:scale-125 focus:outline-none focus:ring-1 focus:ring-accent z-0 hover:z-10 focus:z-10 cursor-pointer ${getCellColorClass(
                          day.level
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y - 8}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-[#0E1210] border border-border text-xs text-white shadow-2xl font-mono whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                hoveredCell.day.count > 0 ? 'bg-accent' : 'bg-border'
              }`}
            />
            <span>
              <strong className="text-accent font-bold">
                {hoveredCell.day.count}
              </strong>{' '}
              {hoveredCell.day.count === 1 ? 'contribution' : 'contributions'} on{' '}
              <span className="text-copy-secondary">
                {formatContributionDate(hoveredCell.day.date)}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Level Legend */}
      <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-copy-secondary border-t border-border/40 pt-3">
        <span className="text-xs">
          Annual Summary · {yearData.year}
        </span>

        <div className="flex items-center gap-1.5" aria-label="Contribution level legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div
              key={lvl}
              className={`w-[12px] h-[12px] rounded-[2.5px] ${getCellColorClass(lvl)}`}
              title={`Level ${lvl}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
