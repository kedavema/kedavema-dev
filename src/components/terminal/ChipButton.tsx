export function ChipButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border border-border px-3 py-1 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </button>
  );
}
