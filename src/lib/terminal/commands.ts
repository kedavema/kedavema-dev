import { getProfile } from "@/lib/content";
import { parseCommand } from "./parser";
import type { Command, CommandContext, CommandResult } from "./types";

const UPCOMING_COMMANDS = [
  { name: "skills", description: "list core skills" },
  { name: "projects", description: "list featured projects" },
  { name: "case-study <slug>", description: "show a project case study" },
  { name: "architecture", description: "explain this site's architecture" },
  { name: "resume", description: "view/download resume" },
];

const commands: Command[] = [
  {
    name: "help",
    description: "list available commands",
    run: () => {
      const lines: CommandResult["lines"] = [
        { kind: "text", value: "Available commands:" },
        ...registry.map((command) => ({
          kind: "text" as const,
          value: `  ${command.name.padEnd(14)} ${command.description}`,
        })),
        { kind: "muted", value: "" },
        { kind: "muted", value: "Coming soon:" },
        ...UPCOMING_COMMANDS.map((command) => ({
          kind: "muted" as const,
          value: `  ${command.name.padEnd(14)} ${command.description}`,
        })),
      ];
      return { lines };
    },
  },
  {
    name: "about",
    description: "short intro",
    run: () => {
      const profile = getProfile();
      return {
        lines: [
          { kind: "text", value: `${profile.name} — ${profile.title}` },
          { kind: "text", value: profile.location },
          { kind: "text", value: profile.summary },
        ],
      };
    },
  },
  {
    name: "clear",
    description: "clear the terminal",
    run: () => ({ lines: [], clear: true }),
  },
];

const registry = commands;

export function getCommands(): Command[] {
  return registry;
}

export function executeCommand(raw: string, ctx: CommandContext): CommandResult {
  const parsed = parseCommand(raw);
  if (!parsed) {
    return { lines: [] };
  }

  const command = registry.find((c) => c.name === parsed.name);
  if (!command) {
    return {
      lines: [
        {
          kind: "muted",
          value: `command not found: ${parsed.name} (try "help")`,
        },
      ],
    };
  }

  return command.run(parsed.args, ctx);
}
