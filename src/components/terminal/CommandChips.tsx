import { ChipButton } from "./ChipButton";

const CHIPS = ["help", "about", "clear"];

export function CommandChips({ onDispatch }: { onDispatch: (raw: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {CHIPS.map((chip) => (
        <ChipButton key={chip} label={chip} onClick={() => onDispatch(chip)} />
      ))}
    </div>
  );
}
