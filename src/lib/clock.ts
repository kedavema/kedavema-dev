/** Paraguay has stayed on UTC-3 all year since October 2024. */
const ASUNCION_OFFSET_MINUTES = -3 * 60;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toAsuncion(date: Date): Date {
  return new Date(date.getTime() + ASUNCION_OFFSET_MINUTES * 60_000);
}

/** Time in Asunción as "HH:MM", independent of the visitor's own time zone. */
export function formatAsuncionTime(date: Date): string {
  const shifted = toAsuncion(date);
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/** Date and time in Asunción, e.g. "24 Nov 2026, 16:47". */
export function formatAsuncionDateTime(date: Date): string {
  const shifted = toAsuncion(date);
  return `${shifted.getUTCDate()} ${MONTHS[shifted.getUTCMonth()]} ${shifted.getUTCFullYear()}, ${formatAsuncionTime(date)}`;
}
