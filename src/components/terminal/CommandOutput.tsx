import type { CommandEntry } from "@/lib/terminal/types";

export function CommandOutput({ entries }: { entries: CommandEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id}>
          <p className="text-accent">
            visitor@portfolio:~$ <span className="text-foreground">{entry.input}</span>
          </p>
          {entry.result.lines.map((line, index) => (
            <p
              key={index}
              className={line.kind === "muted" ? "text-muted" : "text-foreground"}
            >
              {line.value || " "}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
