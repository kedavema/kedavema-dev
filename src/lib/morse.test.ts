import { describe, expect, it } from "vitest";
import { toMorse } from "./morse";

describe("toMorse", () => {
  it("encodes letters and separates words", () => {
    expect(toMorse("SOS now")).toBe("... --- ... / -. --- .--");
  });

  it("drops accents and characters without a code", () => {
    expect(toMorse("Ypacaraí!")).toBe("-.-- .--. .- -.-. .- .-. .- ..");
  });

  it("returns an empty string for blank input", () => {
    expect(toMorse("   ")).toBe("");
  });
});
