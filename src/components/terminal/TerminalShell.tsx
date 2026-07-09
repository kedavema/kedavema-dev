"use client";

import { useState } from "react";
import { executeCommand } from "@/lib/terminal/commands";
import type { CommandEntry } from "@/lib/terminal/types";
import { CommandChips } from "./CommandChips";
import { CommandLine } from "./CommandLine";
import { CommandOutput } from "./CommandOutput";

const WELCOME_ENTRY: CommandEntry = {
  id: "welcome",
  input: "help",
  result: {
    lines: [
      { kind: "text", value: 'Type a command or click a chip below. Try "help".' },
    ],
  },
};

export function TerminalShell() {
  const [entries, setEntries] = useState<CommandEntry[]>([WELCOME_ENTRY]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  function dispatch(raw: string) {
    const result = executeCommand(raw, { history: inputHistory });
    setInputHistory((prev) => [...prev, raw]);

    if (result.clear) {
      setEntries([]);
      setInputHistory([]);
      return;
    }

    setEntries((prev) => [
      ...prev,
      { id: `${Date.now()}-${prev.length}`, input: raw, result },
    ]);
  }

  return (
    <div className="space-y-4">
      <CommandOutput entries={entries} />
      <CommandLine history={inputHistory} onSubmit={dispatch} />
      <CommandChips onDispatch={dispatch} />
    </div>
  );
}
