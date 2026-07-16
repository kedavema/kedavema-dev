"use client";

import { useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-chip-bg px-2 py-1.5 font-mono text-xs text-muted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:px-2.5"
    >
      <span
        className="hidden h-1.5 w-1.5 rounded-full bg-accent md:block"
        aria-hidden="true"
      />
      <span className="md:hidden" aria-hidden="true" suppressHydrationWarning>
        {theme === "dark" ? "☾" : "☼"}
      </span>
      <span className="hidden md:inline" suppressHydrationWarning>
        {theme === "dark" ? "dark" : "light"}
      </span>
    </button>
  );
}
