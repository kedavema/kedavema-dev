export type ParsedCommand = {
  name: string;
  args: string[];
};

export function parseCommand(raw: string): ParsedCommand | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const [name, ...args] = trimmed.split(/\s+/);
  return { name: name.toLowerCase(), args };
}
