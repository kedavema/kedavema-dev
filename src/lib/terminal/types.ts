export type CommandContext = {
  history: string[];
};

export type CommandOutputLine =
  | { kind: "text"; value: string }
  | { kind: "muted"; value: string };

export type CommandResult = {
  lines: CommandOutputLine[];
  clear?: boolean;
};

export type Command = {
  name: string;
  description: string;
  run: (args: string[], ctx: CommandContext) => CommandResult;
};

export type CommandEntry = {
  id: string;
  input: string;
  result: CommandResult;
};
