/** A job as the desktop shows it: menu entry, WORK.DB row and job window. */
export type DesktopJob = {
  company: string;
  role: string;
  /** e.g. "Jan 2026 – now" */
  period: string;
  /** Start year, e.g. "2026" */
  year: string;
  /** 8.3 file name for the job window, e.g. "MANGOPAY.REC" */
  file: string;
  highlights: string[];
  stack: string[];
  caseStudy?: string;
};

export type DialogKind = "job" | "about" | "keys" | "exit" | "telegram";

export type DialogState = { kind: DialogKind; job?: number } | null;

export type MenuName = "file" | "work" | "links" | "help";
