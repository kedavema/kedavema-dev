"use client";

import { useDesktop } from "./DesktopContext";
import type { DialogKind } from "./types";

/** A button that opens one of the desktop windows. Usable from server components. */
export function OpenDialogButton({
  kind,
  className,
  children,
}: {
  kind: DialogKind;
  className?: string;
  children: React.ReactNode;
}) {
  const { openDialog } = useDesktop();
  return (
    <button type="button" aria-haspopup="dialog" className={className} onClick={() => openDialog(kind)}>
      {children}
    </button>
  );
}
