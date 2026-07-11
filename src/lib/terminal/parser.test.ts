import { describe, expect, it } from "vitest";
import { parseCommand } from "./parser";

describe("parseCommand", () => {
  it("returns null for empty or whitespace-only input", () => {
    expect(parseCommand("")).toBeNull();
    expect(parseCommand("   ")).toBeNull();
  });

  it("parses a command with no args", () => {
    expect(parseCommand("help")).toEqual({ name: "help", args: [] });
  });

  it("parses a command with a single arg", () => {
    expect(parseCommand("case-study ai-knowledge-rag")).toEqual({
      name: "case-study",
      args: ["ai-knowledge-rag"],
    });
  });

  it("splits multiple args on whitespace and collapses repeated spaces", () => {
    expect(parseCommand("case-study   foo   bar")).toEqual({
      name: "case-study",
      args: ["foo", "bar"],
    });
  });

  it("lowercases the command name but preserves arg casing", () => {
    expect(parseCommand("CASE-STUDY Foo")).toEqual({
      name: "case-study",
      args: ["Foo"],
    });
  });

  it("trims leading and trailing whitespace", () => {
    expect(parseCommand("  help  ")).toEqual({ name: "help", args: [] });
  });
});
