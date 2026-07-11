import { describe, expect, it } from "vitest";
import { getFeaturedProjects, getProjects, getCaseStudyBySlug } from "@/lib/content";
import { executeCommand, getCommands } from "./commands";

const ctx = { history: [] };

describe("getCommands", () => {
  it("exposes a non-empty registry with unique names", () => {
    const commands = getCommands();
    expect(commands.length).toBeGreaterThan(0);
    const names = commands.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("executeCommand", () => {
  it("returns empty lines for blank input", () => {
    expect(executeCommand("   ", ctx)).toEqual({ lines: [] });
  });

  it("returns a not-found message for an unknown command", () => {
    const result = executeCommand("nope", ctx);
    expect(result.lines[0].value).toContain("command not found: nope");
  });

  it("help lists every registered command", () => {
    const result = executeCommand("help", ctx);
    const text = result.lines.map((l) => l.value).join("\n");
    for (const command of getCommands()) {
      expect(text).toContain(command.name);
    }
  });

  it("about includes the profile name", () => {
    const result = executeCommand("about", ctx);
    expect(result.lines.some((l) => l.value.includes("—"))).toBe(true);
  });

  it("skills returns nav chips excluding itself", () => {
    const result = executeCommand("skills", ctx);
    expect(result.chips).toBeDefined();
    expect(result.chips).not.toContain("skills");
  });

  it("projects lists every featured project and offers case-study chips where available", () => {
    const result = executeCommand("projects", ctx);
    const text = result.lines.map((l) => l.value).join("\n");
    for (const project of getFeaturedProjects()) {
      expect(text).toContain(project.name);
    }
  });

  it("case-study with no slug shows usage and available slugs as chips", () => {
    const result = executeCommand("case-study", ctx);
    expect(result.lines[0].value).toContain("Usage: case-study");
    expect(result.chips?.length).toBeGreaterThan(0);
  });

  it("case-study with an unknown slug reports not found", () => {
    const result = executeCommand("case-study does-not-exist", ctx);
    expect(result.lines[0].value).toContain('No case study found for "does-not-exist"');
  });

  it("case-study with a known slug returns problem/approach/outcome sections", () => {
    const projectWithCaseStudy = getProjects().find((p) => getCaseStudyBySlug(p.slug));
    expect(projectWithCaseStudy).toBeDefined();

    const result = executeCommand(`case-study ${projectWithCaseStudy!.slug}`, ctx);
    const text = result.lines.map((l) => l.value).join("\n");
    expect(text).toContain("Problem");
    expect(text).toContain("Approach");
    expect(text).toContain("Outcome");
  });

  it("architecture returns the summary and nav chips excluding itself", () => {
    const result = executeCommand("architecture", ctx);
    expect(result.lines[0].kind).toBe("text");
    expect(result.chips).not.toContain("architecture");
  });

  it("resume includes the resume link", () => {
    const result = executeCommand("resume", ctx);
    const text = result.lines.map((l) => l.value).join("\n");
    expect(text).toContain("Download:");
  });

  it("contact returns a contact panel", () => {
    const result = executeCommand("contact", ctx);
    expect(result.panel).toBe("contact");
  });

  it("clear returns an empty, clearing result", () => {
    const result = executeCommand("clear", ctx);
    expect(result).toEqual({ lines: [], clear: true });
  });
});
