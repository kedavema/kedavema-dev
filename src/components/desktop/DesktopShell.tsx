"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { Links } from "@content/types";
import { BootScreen, type BootLine } from "./BootScreen";
import { DesktopContext, type DesktopApi } from "./DesktopContext";
import { Dialogs } from "./Dialogs";
import { MenuBar } from "./MenuBar";
import { StatusBar } from "./StatusBar";
import { Wallpaper } from "./Wallpaper";
import type { DialogKind, DialogState, MenuName, DesktopJob } from "./types";

type DesktopShellProps = {
  jobs: DesktopJob[];
  links: Links;
  hometown: string;
  boot: { header: string[]; lines: BootLine[] };
  children: React.ReactNode;
};

function isTyping(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

export function DesktopShell({ jobs, links, hometown, boot, children }: DesktopShellProps) {
  const [menu, setMenu] = useState<MenuName | null>(null);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [selectedJob, setSelectedJob] = useState(0);
  const pathname = usePathname();

  const toggleMenu = useCallback((name: MenuName) => setMenu((current) => (current === name ? null : name)), []);
  const closeMenu = useCallback(() => setMenu(null), []);
  const openDialog = useCallback((kind: DialogKind) => {
    setMenu(null);
    setDialog({ kind });
  }, []);
  const openJob = useCallback((index: number) => {
    setMenu(null);
    setSelectedJob(index);
    setDialog({ kind: "job", job: index });
  }, []);
  const closeDialog = useCallback(
    (kind: DialogKind) => setDialog((current) => (current?.kind === kind ? null : current)),
    [],
  );

  // A new page closes whatever was open.
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setMenu(null);
    setDialog(null);
  }

  const resumeUrl = links.resumeUrl;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || isTyping(event.target) || event.metaKey || event.ctrlKey) return;

      if (event.altKey) {
        if (event.code === "KeyX") {
          event.preventDefault();
          openDialog("exit");
        }
        return;
      }

      // While a window is open, the native dialog handles Esc and keys stay inside it.
      if (document.querySelector("dialog[open]")) return;
      switch (event.key.toLowerCase()) {
        case "escape":
          setMenu(null);
          break;
        case "w":
          toggleMenu("work");
          break;
        case "d":
          window.location.assign(resumeUrl);
          break;
        case "t":
          openDialog("telegram");
          break;
        case "h":
        case "?":
          openDialog("keys");
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleMenu, openDialog, resumeUrl]);

  const api: DesktopApi = useMemo(
    () => ({ menu, dialog, selectedJob, toggleMenu, closeMenu, openDialog, openJob, closeDialog }),
    [menu, dialog, selectedJob, toggleMenu, closeMenu, openDialog, openJob, closeDialog],
  );

  return (
    <DesktopContext.Provider value={api}>
      <Wallpaper />
      <MenuBar jobs={jobs} links={links} />
      <main id="main-content" className="relative mx-auto w-full max-w-[1280px] flex-1 px-4 pb-14 pt-9 sm:px-6">
        {children}
      </main>
      <StatusBar resumeUrl={links.resumeUrl} />
      <Dialogs jobs={jobs} links={links} hometown={hometown} />
      <BootScreen header={boot.header} lines={boot.lines} />
    </DesktopContext.Provider>
  );
}
