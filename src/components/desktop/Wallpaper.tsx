const STRINGS = [
  { width: 3, color: "rgb(217 178 106 / 0.34)" },
  { width: 3, color: "rgb(217 178 106 / 0.30)" },
  { width: 2, color: "rgb(217 178 106 / 0.28)" },
  { width: 2, color: "rgb(233 228 214 / 0.22)" },
  { width: 1, color: "rgb(233 228 214 / 0.26)" },
  { width: 1, color: "rgb(233 228 214 / 0.30)" },
];

/** A guitar for Ypacaraí: six strings running over the sound hole. Decoration only. */
export function Wallpaper() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 flex justify-end overflow-hidden">
      <div className="relative mr-[6%] h-full w-[640px] shrink-0">
        <div className="wallpaper-rosette absolute left-1/2 top-[52%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 top-0 flex w-[150px] -translate-x-1/2 justify-between">
          {STRINGS.map((string, index) => (
            <span key={index} style={{ width: string.width, background: string.color }} />
          ))}
        </div>
      </div>
    </div>
  );
}
