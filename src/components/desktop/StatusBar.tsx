"use client";

import { useDesktop } from "./DesktopContext";

function Key({ children }: { children: React.ReactNode }) {
  return <span className="bg-bar-ink px-1.5 text-ink">{children}</span>;
}

export function StatusBar({ resumeUrl }: { resumeUrl: string }) {
  const { toggleMenu, openDialog } = useDesktop();

  return (
    <footer className="relative z-[5] flex flex-wrap items-center justify-between gap-x-4 bg-bar px-3 py-0.5 text-bar-ink">
      <div className="flex flex-wrap">
        <button
          type="button"
          className="status-key"
          onClick={() => {
            window.scrollTo({ top: 0 });
            toggleMenu("work");
          }}
        >
          <Key>W</Key> Work
        </button>
        <a className="status-key" href={resumeUrl}>
          <Key>D</Key> Résumé
        </a>
        <button type="button" className="status-key" onClick={() => openDialog("telegram")}>
          <Key>T</Key> Telegram
        </button>
        <button type="button" className="status-key" onClick={() => openDialog("keys")}>
          <Key>H</Key> Help
        </button>
      </div>
      <span>
        kedavema.dev · made between Ypacaraí and Asunción ·{" "}
        <a className="underline underline-offset-4" href="https://github.com/kedavema/kedavema-dev">
          source
        </a>
      </span>
    </footer>
  );
}
