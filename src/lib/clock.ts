/** Paraguay has stayed on UTC-3 all year since October 2024. */
const ASUNCION_OFFSET_MINUTES = -3 * 60;

/** Time in Asunción as "HH:MM", independent of the visitor's own time zone. */
export function formatAsuncionTime(date: Date): string {
  const shifted = new Date(date.getTime() + ASUNCION_OFFSET_MINUTES * 60_000);
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
