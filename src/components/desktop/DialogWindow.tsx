"use client";

import { useEffect, useRef } from "react";

type DialogWindowProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  badge?: string;
  /** Max width in px. */
  width?: number;
  children: React.ReactNode;
};

/**
 * A window that opens on top of the desktop. Built on the native <dialog>,
 * so focus moves into it, Esc closes it and the page behind is inert.
 */
export function DialogWindow({
  open,
  onClose,
  title,
  titleId,
  badge,
  width = 680,
  children,
}: DialogWindowProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    } else if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="window-dialog"
      aria-labelledby={titleId}
      style={{ width: `min(100% - 32px, ${width}px)`, overflow: "auto", paddingRight: 16, paddingBottom: 16 }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="win-open border-[3px] border-double border-ink bg-win shadow-[16px_16px_0_var(--well)]">
          <div className="flex items-center gap-3 bg-accent px-2.5 text-bar-ink">
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-[22px] text-bar-ink"
            >
              [■]
            </button>
            <h2 id={titleId} className="m-0 flex-1 text-center text-[22px] font-normal leading-[1.25]">
              {title}
            </h2>
            <span aria-hidden="true">{badge}</span>
          </div>
          <div className="px-6 pb-8 pt-5 sm:px-[30px]">{children}</div>
        </div>
      )}
    </dialog>
  );
}
