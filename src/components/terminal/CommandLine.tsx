"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

type CommandLineProps = {
  history: string[];
  onSubmit: (raw: string) => void;
};

export function CommandLine({ history, onSubmit }: CommandLineProps) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const raw = value;
      setValue("");
      setHistoryIndex(null);
      if (raw.trim()) onSubmit(raw);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue("");
        return;
      }
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    }
  }

  return (
    <div className="flex items-center gap-2 text-accent">
      <span>visitor@portfolio:~$</span>
      <input
        className="flex-1 bg-transparent text-foreground outline-none"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setHistoryIndex(null);
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="terminal command input"
      />
    </div>
  );
}
