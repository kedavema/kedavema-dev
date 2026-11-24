/**
 * Builds an 8.3 file name, the way DOS would show it: "Más Money" + "REC" → "MASMONEY.REC".
 */
export function toDosName(name: string, extension: string): string {
  const base = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
  return `${base || "UNTITLED"}.${extension.toUpperCase().slice(0, 3)}`;
}
