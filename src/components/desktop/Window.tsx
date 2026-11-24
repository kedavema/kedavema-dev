import { cn } from "@/lib/cn";

type WindowProps = {
  title: string;
  /** Small mark on the right of the title bar, like a window number. */
  badge?: string;
  /** The active window gets a double frame and the accent title bar. */
  active?: boolean;
  titleId: string;
  titleAs?: "h1" | "h2";
  id?: string;
  /** Delay for the opening animation, in ms. */
  delay?: number;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
};

/** A text-mode window: title bar, frame and a solid block shadow. */
export function Window({
  title,
  badge,
  active = false,
  titleId,
  titleAs: Title = "h2",
  id,
  delay,
  className,
  bodyClassName,
  children,
}: WindowProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(
        "win-open shadow-block min-w-0 scroll-mt-16 bg-win",
        active ? "border-[3px] border-double border-ink" : "border-2 border-frame",
        className,
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-2.5",
          active ? "bg-accent text-bar-ink" : "bg-title-off text-title-off-ink",
        )}
      >
        <span aria-hidden="true">[■]</span>
        <Title id={titleId} className="m-0 flex-1 text-center text-[22px] font-normal leading-[1.25]">
          {title}
        </Title>
        <span aria-hidden="true">{badge}</span>
      </div>
      <div className={bodyClassName ?? "px-7 pb-8 pt-6"}>{children}</div>
    </section>
  );
}
