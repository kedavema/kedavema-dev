import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-2 shadow-[0_8px_24px_-6px_var(--accent-soft)]",
  secondary:
    "bg-panel-2 text-fg border border-border-strong hover:border-accent-line",
  ghost:
    "border border-accent-line bg-accent-soft text-accent hover:border-accent",
};

const baseClasses =
  "inline-flex items-center gap-2 rounded-lg px-5 py-3 font-display text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

type CTAButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & (
  | { href: string; download?: boolean; onClick?: never }
  | { href?: never; download?: never; onClick?: () => void; type?: "button" | "submit" }
);

export function CTAButton({
  children,
  variant = "primary",
  className,
  href,
  ...rest
}: CTAButtonProps) {
  const classes = cn(baseClasses, VARIANT_CLASSES[variant], className);

  if (href) {
    const { download } = rest as { download?: boolean };
    return (
      <Link href={href} download={download} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = rest as {
    onClick?: () => void;
    type?: "button" | "submit";
  };

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
