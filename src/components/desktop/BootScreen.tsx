"use client";

import { Fragment, useEffect } from "react";

export const BOOT_STORAGE_KEY = "kedavema-booted";

/**
 * Runs in <head> before the first paint. Shows the boot screen once per session,
 * and never for reduced motion or automated browsers (crawlers, tests).
 */
export const BOOT_INIT_SCRIPT = `(function(){try{if(navigator.webdriver)return;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${BOOT_STORAGE_KEY}"))return;document.documentElement.setAttribute("data-boot","")}catch(e){}})();`;

export type BootLine = { label: string; value: string; ok?: boolean; green?: boolean };

const BOOT_MS = 1900;
const LINE_STEP_MS = 110;

const appear = (index: number) => ({ animationDelay: `${index * LINE_STEP_MS}ms` });

export function BootScreen({ header, lines }: { header: string[]; lines: BootLine[] }) {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-boot")) return;

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip, true);
      window.removeEventListener("pointerdown", skip, true);
    }
    function finish() {
      root.removeAttribute("data-boot");
      try {
        sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
      } catch {
        // Storage can be blocked; the boot screen may then show again next visit.
      }
      cleanup();
    }
    // Any key or tap skips the boot. Captured so it doesn't also fire a shortcut.
    function skip(event: Event) {
      event.stopImmediatePropagation();
      event.preventDefault();
      finish();
    }

    const timer = window.setTimeout(finish, BOOT_MS);
    window.addEventListener("keydown", skip, true);
    window.addEventListener("pointerdown", skip, true);
    return cleanup;
  }, []);

  return (
    <div
      aria-hidden="true"
      data-testid="boot-screen"
      className="boot-screen fixed inset-0 z-[100] flex-col justify-between overflow-hidden bg-black p-6 text-[24px] leading-[1.22] text-[#b9b5aa] sm:p-12 sm:text-[28px]"
    >
      <div className="flex justify-between gap-10">
        <div className="min-w-0">
          {header.map((line, i) => (
            <div key={i} className={`boot-line ${i === 0 ? "text-ink" : ""}`} style={appear(i)}>
              {line}
            </div>
          ))}
          <div className="h-7" />
          <div className="grid grid-cols-[minmax(0,17ch)_minmax(0,1fr)] gap-x-[1ch]">
            {lines.map((line, i) => {
              const style = appear(header.length + i);
              return (
                <Fragment key={line.label}>
                  <span className="boot-line" style={style}>
                    {line.label}
                  </span>
                  <span className="boot-line" style={style}>
                    <span className={line.green ? "text-ok" : "text-ink"}>{line.value}</span>
                    {line.ok && <span className="text-ok"> OK</span>}
                  </span>
                </Fragment>
              );
            })}
          </div>
          <div className="h-7" />
          <div className="boot-line text-ink" style={appear(header.length + lines.length)}>
            Starting kedavema desktop<span className="blink">_</span>
          </div>
        </div>
        <div className="hidden h-[132px] w-[176px] shrink-0 items-center justify-center gap-3.5 border-[3px] border-double border-accent text-accent sm:flex">
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
            <line x1="19" y1="10" x2="19" y2="54" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            <path d="M47 10 27 32 47 54" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[30px] leading-none">kedavema</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 text-[#8d897f]">
        <span>Press any key to skip</span>
        <span>Shown once per visit</span>
      </div>
    </div>
  );
}
