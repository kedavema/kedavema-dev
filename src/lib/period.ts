const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(yearMonth: string) {
  const [year, month] = yearMonth.split("-");
  return { year, month: MONTHS[Number(month) - 1] };
}

/**
 * Formats a `YYYY-MM` range for display.
 * - no end: "Jan 2026 – now"
 * - same year: "Apr – Oct 2022"
 * - otherwise: "Jun 2023 – Dec 2024"
 */
export function formatPeriod(start: string, end?: string): string {
  const from = parse(start);
  if (!end) return `${from.month} ${from.year} – now`;

  const to = parse(end);
  if (from.year === to.year) return `${from.month} – ${to.month} ${to.year}`;
  return `${from.month} ${from.year} – ${to.month} ${to.year}`;
}
