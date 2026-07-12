import { cn } from "@/lib/cn";

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative space-y-4 pl-4">
      <div
        className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-border-strong"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export function TimelineItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        className="absolute -left-4 top-1.5 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_var(--accent-soft)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
