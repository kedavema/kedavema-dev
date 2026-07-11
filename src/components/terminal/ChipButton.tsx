export function ChipButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Run command: ${label}`}
      className="rounded border border-border px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {label}
    </button>
  );
}
