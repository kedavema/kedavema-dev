import { profile } from "@content/profile";
import { links } from "@content/links";
import { experience } from "@content/experience";
import { stack } from "@content/stack";
import { sideProjects } from "@content/side-projects";
import { caseStudies } from "@content/case-studies";

export function getProfile() {
  return profile;
}

export function getLinks() {
  return links;
}

const OPEN_END = "9999-12";

/** Current job first, then by most recent end date (start date breaks ties). */
export function getExperience() {
  return [...experience].sort(
    (a, b) =>
      (b.end ?? OPEN_END).localeCompare(a.end ?? OPEN_END) || b.start.localeCompare(a.start),
  );
}

export function getStack() {
  return stack;
}

export function getSideProjects() {
  return sideProjects;
}

export function getCaseStudies() {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

