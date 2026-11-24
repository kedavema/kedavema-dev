"use client";

import { useEffect, useRef } from "react";
import type { Links } from "@content/types";
import { KLogo } from "@/components/KLogo";
import { Clock } from "./Clock";
import { useDesktop } from "./DesktopContext";
import type { DesktopJob, MenuName } from "./types";

const panelClass =
  "absolute left-0 top-full z-40 max-w-[calc(100vw-32px)] border-[3px] border-double border-ink bg-win py-1.5 text-ink shadow-[10px_10px_0_var(--well)]";

function MenuButton({ name, hotkey, rest }: { name: MenuName; hotkey: string; rest: string }) {
  const { menu, toggleMenu } = useDesktop();
  const open = menu === name;
  return (
    <button
      type="button"
      className="menu-button"
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={`menu-${name}`}
      onClick={() => toggleMenu(name)}
    >
      <span className="hotkey">{hotkey}</span>
      {rest}
    </button>
  );
}

function Shortcut({ children }: { children: React.ReactNode }) {
  return <span className="text-dim">{children}</span>;
}

export function MenuBar({ jobs, links }: { jobs: DesktopJob[]; links: Links }) {
  const { menu, closeMenu, openDialog, openJob } = useDesktop();
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menu) return;
    function onPointerDown(event: PointerEvent) {
      if (barRef.current && !barRef.current.contains(event.target as Node)) closeMenu();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menu, closeMenu]);

  return (
    <header ref={barRef} className="sticky top-0 z-30 bg-bar text-bar-ink">
      <nav
        aria-label="Main menu"
        className="flex flex-wrap items-center justify-between gap-x-4 px-3"
      >
        <div className="flex flex-wrap items-center">
          <div className="flex items-center gap-2 py-1 pl-1 pr-2 sm:pr-3">
            <KLogo />
            <span className="hidden sm:inline">kedavema</span>
          </div>

          <div className="relative">
            <MenuButton name="file" hotkey="F" rest="ile" />
            {menu === "file" && (
              <div id="menu-file" className={`${panelClass} w-[32ch]`}>
                <a className="menu-item" href={links.resumeUrl}>
                  <span>Open résumé.pdf</span>
                  <Shortcut>D</Shortcut>
                </a>
                <button type="button" className="menu-item" onClick={() => openDialog("about")}>
                  <span>About this desktop</span>
                </button>
                <div aria-hidden="true" className="my-1.5 border-t border-line" />
                <button type="button" className="menu-item" onClick={() => openDialog("exit")}>
                  <span>Exit</span>
                  <Shortcut>Alt-X</Shortcut>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <MenuButton name="work" hotkey="W" rest="ork" />
            {menu === "work" && (
              <div id="menu-work" className={`${panelClass} w-[38ch]`}>
                {jobs.map((job, index) => (
                  <button
                    key={job.file}
                    type="button"
                    className="menu-item"
                    onClick={() => openJob(index)}
                  >
                    <span>{job.company}</span>
                    <Shortcut>{job.year}</Shortcut>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <MenuButton name="links" hotkey="L" rest="inks" />
            {menu === "links" && (
              <div id="menu-links" className={`${panelClass} w-[34ch]`}>
                <button type="button" className="menu-item" onClick={() => openDialog("telegram")}>
                  <span>Send a telegram</span>
                  <Shortcut>T</Shortcut>
                </button>
                <a className="menu-item" href={`mailto:${links.email}`}>
                  <span>Email</span>
                  <Shortcut>{links.email}</Shortcut>
                </a>
                <a className="menu-item" href={links.github}>
                  <span>GitHub</span>
                  <Shortcut>↗</Shortcut>
                </a>
                <a className="menu-item" href={links.linkedin}>
                  <span>LinkedIn</span>
                  <Shortcut>↗</Shortcut>
                </a>
              </div>
            )}
          </div>

          <div className="relative">
            <MenuButton name="help" hotkey="H" rest="elp" />
            {menu === "help" && (
              <div id="menu-help" className={`${panelClass} w-[32ch]`}>
                <button type="button" className="menu-item" onClick={() => openDialog("keys")}>
                  <span>Keyboard shortcuts</span>
                  <Shortcut>H</Shortcut>
                </button>
                <button type="button" className="menu-item" onClick={() => openDialog("about")}>
                  <span>About this desktop</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <Clock />
      </nav>
    </header>
  );
}
