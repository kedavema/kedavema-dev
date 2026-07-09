import type { CommandEntry } from "@/lib/terminal/types";
import { ChipButton } from "./ChipButton";

export function CommandOutput({
  entries,
  onDispatch,
}: {
  entries: CommandEntry[];
  onDispatch: (raw: string) => void;
}) {
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
              {line.value || " "}
            </p>
          ))}
          {entry.result.chips && entry.result.chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {entry.result.chips.map((chip) => (
                <ChipButton key={chip} label={chip} onClick={() => onDispatch(chip)} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
