import { cn } from "@/lib/cn";

type SectionEyebrowProps = {
  children: React.ReactNode;
  tone?: "accent" | "faint";
  as?: "div" | "span";
  className?: string;
};

export function SectionEyebrow({
  children,
  tone = "faint",
  as: Tag = "div",
  className,
}: SectionEyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.16em]",
        tone === "accent" ? "text-accent" : "text-faint",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
