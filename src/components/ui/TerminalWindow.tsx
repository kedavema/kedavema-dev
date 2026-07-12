import { cn } from "@/lib/cn";

type TerminalWindowProps = {
  title: string;
  children: React.ReactNode;
  variant?: "dot" | "traffic-lights";
  meta?: React.ReactNode;
  className?: string;
};

export function TerminalWindow({
  title,
  children,
  variant = "dot",
  meta,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-strong bg-code-bg",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          {variant === "traffic-lights" ? (
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            </div>
          ) : (
            <span
              className="h-2 w-2 rounded-full bg-green"
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-xs text-faint">{title}</span>
        </div>
        {meta}
      </div>
      <div className="p-4 font-mono text-xs leading-6">{children}</div>
    </div>
  );
}
