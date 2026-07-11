import { describe, expect, it } from "vitest";
import {
  getArchitecture,
  getCaseStudyBySlug,
  getCoreSkills,
  getExperience,
  getFeaturedProjects,
  getLanguages,
  getLinks,
  getProfile,
  getProjectBySlug,
  getProjects,
  getSkillGroups,
} from "./content";

describe("content repository", () => {
  it("returns the profile", () => {
    const profile = getProfile();
    expect(profile.name).toBeTruthy();
    expect(profile.email).toContain("@");
  });

  it("returns links with a github and linkedin url", () => {
    const links = getLinks();
    expect(links.github).toMatch(/^https:\/\//);
    expect(links.linkedin).toMatch(/^https:\/\//);
  });

  it("returns non-empty skill groups and core skills", () => {
    expect(getSkillGroups().length).toBeGreaterThan(0);
    expect(getCoreSkills().length).toBeGreaterThan(0);
  });

  it("returns languages", () => {
    expect(getLanguages().length).toBeGreaterThan(0);
  });

  it("returns projects sorted by order", () => {
    const projects = getProjects();
    const orders = projects.map((p) => p.order);
    const sorted = [...orders].sort((a, b) => a - b);
    expect(orders).toEqual(sorted);
  });

  it("filters featured projects", () => {
    const featured = getFeaturedProjects();
    expect(featured.every((p) => p.featured)).toBe(true);
    expect(featured.length).toBeGreaterThan(0);
  });

  it("looks up a project by slug", () => {
    const [first] = getProjects();
    expect(getProjectBySlug(first.slug)).toEqual(first);
  });

  it("returns undefined for an unknown project slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("looks up a case study by project slug when one exists", () => {
    const projectWithCaseStudy = getProjects().find((p) =>
      getCaseStudyBySlug(p.slug)
    );
    expect(projectWithCaseStudy).toBeDefined();
    const caseStudy = getCaseStudyBySlug(projectWithCaseStudy!.slug);
    expect(caseStudy?.projectSlug).toBe(projectWithCaseStudy!.slug);
  });

  it("returns undefined for a project without a case study", () => {
    expect(getCaseStudyBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns experience entries", () => {
    expect(getExperience().length).toBeGreaterThan(0);
  });

  it("returns the architecture narrative", () => {
    const architecture = getArchitecture();
    expect(architecture.summary).toBeTruthy();
    expect(architecture.notes.length).toBeGreaterThan(0);
  });
});
