import type { CommandEntry } from "@/lib/terminal/types";
import { getLinks } from "@/lib/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { ChipButton } from "./ChipButton";

export function CommandOutput({
  entries,
  onDispatch,
}: {
  entries: CommandEntry[];
  onDispatch: (raw: string) => void;
}) {
  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
      className="space-y-4 overflow-x-hidden"
    >
      {entries.map((entry) => (
        <div key={entry.id}>
          <p className="break-words text-accent">
            visitor@portfolio:~$ <span className="text-foreground">{entry.input}</span>
          </p>
          {entry.result.lines.map((line, index) => (
            <p
              key={index}
              className={`break-words ${line.kind === "muted" ? "text-muted" : "text-foreground"}`}
            >
              {line.value || " "}
            </p>
          ))}
          {entry.result.panel === "contact" && (
            <div className="mt-3 max-w-md rounded border border-border p-4">
              <ContactForm links={getLinks()} compact />
            </div>
          )}
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
