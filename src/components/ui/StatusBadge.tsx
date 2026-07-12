import { cn } from "@/lib/cn";

export function StatusBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
