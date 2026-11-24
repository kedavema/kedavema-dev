"use client";

import { useDesktop } from "./DesktopContext";
import type { DesktopJob } from "./types";

/** The list inside WORK.DB. Each row opens that job's window. */
export function WorkDb({ jobs }: { jobs: DesktopJob[] }) {
  const { openJob, selectedJob } = useDesktop();

  return (
    <div className="flex flex-col gap-1">
      <div
        aria-hidden="true"
        className="mb-1 grid grid-cols-[6ch_minmax(0,1fr)] gap-x-[1ch] border-b border-line px-2.5 pb-1.5 text-dim"
      >
        <span>YEAR</span>
        <span>COMPANY · ROLE</span>
      </div>
      <ul className="m-0 flex list-none flex-col p-0">
        {jobs.map((job, index) => (
          <li key={job.file}>
            <button
              type="button"
              className="db-row"
              aria-haspopup="dialog"
              aria-current={index === selectedJob ? "true" : undefined}
              onClick={() => openJob(index)}
            >
              <span>{job.year}</span>
              <span className="min-w-0">
                <span className="db-row-name">{job.company}</span>{" "}
                <span className="db-row-role text-dim">· {job.role}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-1.5 border-t border-line px-2.5 pt-2 text-dim">
        Enter opens a record · {jobs.length} records
      </div>
    </div>
  );
}
