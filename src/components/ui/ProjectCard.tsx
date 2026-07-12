import Link from "next/link";
import type { Project } from "@content/types";
import { cn } from "@/lib/cn";

type StatusTone = "green" | "accent";

const TONE_CLASSES: Record<StatusTone, string> = {
  green: "text-green border-green/40",
  accent: "text-accent border-accent-line",
};

type ProjectCardProps = {
  index: number;
  project: Project;
  statusLabel: string;
  statusTone: StatusTone;
};

export function ProjectCard({
  index,
  project,
  statusLabel,
  statusTone,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-border bg-panel-2 p-6 text-left transition-colors hover:border-accent-line hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:gap-6"
    >
      <div className="font-mono text-sm font-semibold text-faint">
        {String(index).padStart(2, "0")}
      </div>
      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <span className="break-words font-display text-lg font-semibold text-fg">
            {project.name}
          </span>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-[10px]",
              TONE_CLASSES[statusTone],
            )}
          >
            {statusLabel}
          </span>
        </div>
        <p className="mb-2 max-w-xl text-[13.5px] leading-relaxed text-muted">
          {project.summary}
        </p>
        <div className="break-words font-mono text-[11px] leading-relaxed text-faint">
          {project.stack.join(" · ")}
        </div>
      </div>
      <div className="font-display text-xl text-accent" aria-hidden="true">
        →
      </div>
    </Link>
  );
}
