import { describe, expect, it } from "vitest";
import { formatPeriod } from "./period";

describe("formatPeriod", () => {
  it("shows an open range as 'now'", () => {
    expect(formatPeriod("2026-01")).toBe("Jan 2026 – now");
  });

  it("collapses the year when both ends share it", () => {
    expect(formatPeriod("2022-04", "2022-10")).toBe("Apr – Oct 2022");
  });

  it("keeps both years across a year boundary", () => {
    expect(formatPeriod("2023-06", "2024-12")).toBe("Jun 2023 – Dec 2024");
  });
});
