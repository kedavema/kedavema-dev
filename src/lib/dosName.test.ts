import { describe, expect, it } from "vitest";
import { toDosName } from "./dosName";

describe("toDosName", () => {
  it("drops accents and spaces", () => {
    expect(toDosName("Más Money", "rec")).toBe("MASMONEY.REC");
  });

  it("cuts the name to eight characters", () => {
    expect(toDosName("Penguin Academy", "REC")).toBe("PENGUINA.REC");
  });

  it("falls back when nothing is left", () => {
    expect(toDosName("—", "txt")).toBe("UNTITLED.TXT");
  });
});
