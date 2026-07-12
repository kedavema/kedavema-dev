import { cn } from "@/lib/cn";

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export function Panel({ children, className, as: Tag = "div" }: PanelProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-panel-2 p-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
