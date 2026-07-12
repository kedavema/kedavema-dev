import { profile } from "@content/profile";
import { links } from "@content/links";
import { coreSkills, skillGroups, languages } from "@content/skills";
import { projects } from "@content/projects";
import { caseStudies } from "@content/case-studies";
import { experience } from "@content/experience";
import { architecture } from "@content/architecture";
import { principles } from "@content/principles";

export function getProfile() {
  return profile;
}

export function getLinks() {
  return links;
}

export function getSkillGroups() {
  return skillGroups;
}

export function getCoreSkills() {
  return coreSkills;
}

export function getLanguages() {
  return languages;
}

export function getProjects() {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects() {
  return getProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.projectSlug === slug);
}

export function getExperience() {
  return experience;
}

export function getArchitecture() {
  return architecture;
}

export function getPrinciples() {
  return principles;
}
