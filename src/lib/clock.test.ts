import { describe, expect, it } from "vitest";
import { formatAsuncionDateTime, formatAsuncionTime } from "./clock";

describe("formatAsuncionDateTime", () => {
  it("uses the Asunción date, not the UTC one", () => {
    expect(formatAsuncionDateTime(new Date("2026-11-25T01:30:00Z"))).toBe("24 Nov 2026, 22:30");
  });
});

describe("formatAsuncionTime", () => {
  it("shifts UTC by three hours", () => {
    expect(formatAsuncionTime(new Date("2026-11-24T00:04:00Z"))).toBe("21:04");
  });

  it("pads single digits", () => {
    expect(formatAsuncionTime(new Date("2026-07-01T12:05:00Z"))).toBe("09:05");
  });
});
