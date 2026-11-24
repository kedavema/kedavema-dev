import type { ExperienceEntry } from "@content/types";
import { toDosName } from "@/lib/dosName";
import { formatPeriod } from "@/lib/period";
import type { DesktopJob } from "./types";

export function toDesktopJobs(entries: ExperienceEntry[]): DesktopJob[] {
  return entries.map((entry) => ({
    company: entry.company,
    role: entry.role,
    period: formatPeriod(entry.start, entry.end),
    year: entry.start.slice(0, 4),
    file: toDosName(entry.company, "REC"),
    highlights: entry.highlights,
    stack: entry.stack,
    caseStudy: entry.caseStudy,
  }));
}
