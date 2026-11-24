import { describe, expect, it } from "vitest";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getExperience,
  getLinks,
  getProfile,
  getSideProjects,
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

  it("lists the current job first, then by most recent end date", () => {
    const [current, ...past] = getExperience();
    expect(current.end).toBeUndefined();

    const ends = past.map((entry) => entry.end!);
    expect(ends).toEqual([...ends].sort().reverse());
  });

  it("has exactly one current job", () => {
    expect(getExperience().filter((entry) => !entry.end)).toHaveLength(1);
  });

  it("never ends a job before it starts", () => {
    for (const entry of getExperience()) {
      if (entry.end) expect(entry.end >= entry.start).toBe(true);
    }
  });

  it("links only to case studies that exist", () => {
    const referenced = [...getExperience(), ...getSideProjects()]
      .map((item) => item.caseStudy)
      .filter((slug): slug is string => Boolean(slug));

    expect(referenced.length).toBeGreaterThan(0);
    for (const slug of referenced) {
      expect(getCaseStudyBySlug(slug), `missing case study "${slug}"`).toBeDefined();
    }
  });

  it("uses unique case study slugs", () => {
    const slugs = getCaseStudies().map((caseStudy) => caseStudy.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("returns undefined for an unknown case study", () => {
    expect(getCaseStudyBySlug("does-not-exist")).toBeUndefined();
  });
});
