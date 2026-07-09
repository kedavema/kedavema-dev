const CHIPS = ["help", "about", "clear"];

export function CommandChips({ onDispatch }: { onDispatch: (raw: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onDispatch(chip)}
          className="rounded border border-border px-3 py-1 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
