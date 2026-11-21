import { ContributionDay } from './githubContributions';

/**
 * Format a count into a localized string with commas, e.g. 2,796
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Formats a YYYY-MM-DD date into a readable string like "Wednesday, Feb 28, 2026"
 */
export function formatContributionDate(dateStr: string): string {
  if (!dateStr) return '';
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const date = new Date(Date.UTC(year, month, day));
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Groups a year's list of 365/366 days into columns of weeks (Sunday = row 0, Saturday = row 6).
 * Empty padding slots before Jan 1 and after Dec 31 are represented as null.
 * Returns an array of weeks (columns), typically 53 columns.
 */
export function groupDaysIntoWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (!days || days.length === 0) return [];

  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  // Determine starting weekday of the first day
  const [firstYear, firstMonth, firstDay] = days[0].date.split('-').map(Number);
  const startDayOfWeek = new Date(Date.UTC(firstYear, firstMonth - 1, firstDay)).getUTCDay();

  // Fill padding before Jan 1
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Push actual days
  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing padding after the last day
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Calculates month header abbreviations ("Jan", "Feb", etc.) aligned with the 53 week columns.
 */
export function getMonthLabels(weeks: (ContributionDay | null)[][]): { colIndex: number; label: string }[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels: { colIndex: number; label: string }[] = [];
  let lastReportedMonth = -1;

  weeks.forEach((week, colIndex) => {
    // Find first non-null day in this week
    const firstDay = week.find((d): d is ContributionDay => d !== null);
    if (!firstDay) return;

    const monthNum = parseInt(firstDay.date.split('-')[1], 10) - 1; // 0-11
    if (monthNum !== lastReportedMonth) {
      labels.push({
        colIndex,
        label: monthNames[monthNum],
      });
      lastReportedMonth = monthNum;
    }
  });

  return labels;
}

/**
 * Returns the CSS class names for cell background, border, and glow according to heat level (0-4).
 * Uses electric lime (#B6FF4A) on dark theme, vibrant emerald on light theme.
 */
export function getCellColorClass(level: number): string {
  switch (level) {
    case 1:
      // ~25% opacity
      return 'bg-emerald-500/20 dark:bg-[#B6FF4A]/20 border border-emerald-500/30 dark:border-[#B6FF4A]/30';
    case 2:
      // ~45% opacity
      return 'bg-emerald-500/45 dark:bg-[#B6FF4A]/45 border border-emerald-500/55 dark:border-[#B6FF4A]/55';
    case 3:
      // ~70% opacity
      return 'bg-emerald-500/70 dark:bg-[#B6FF4A]/70 border border-emerald-500/80 dark:border-[#B6FF4A]/80';
    case 4:
      // 100% solid lime + subtle glow
      return 'bg-emerald-600 dark:bg-[#B6FF4A] border border-emerald-700 dark:border-[#B6FF4A] shadow-[0_0_8px_rgba(182,255,74,0.35)]';
    case 0:
    default:
      return 'bg-card/70 dark:bg-[#151A17] border border-border/50 dark:border-border/30';
  }
}
