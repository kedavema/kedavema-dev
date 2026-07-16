import { z } from "zod";

export const profileSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  email: z.string().email(),
  summary: z.string(),
});
export type Profile = z.infer<typeof profileSchema>;

export const linksSchema = z.object({
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  resumeUrl: z.string(),
});
export type Links = z.infer<typeof linksSchema>;

export const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()).min(1),
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const projectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  type: z.enum(["personal", "professional"]),
  status: z.enum(["in development", "production"]),
  summary: z.string(),
  stack: z.array(z.string()).min(1),
  featured: z.boolean(),
  order: z.number(),
  roleTitle: z.string().optional(),
  employmentDates: z.string().optional(),
  links: z
    .object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
    })
    .optional(),
});
export type Project = z.infer<typeof projectSchema>;

export const pipelineStepSchema = z.object({
  step: z.string(),
  title: z.string(),
  body: z.string(),
});
export type PipelineStep = z.infer<typeof pipelineStepSchema>;

export const caseStudySchema = z.object({
  projectSlug: z.string(),
  problem: z.string(),
  approach: z.string(),
  architectureNotes: z.string(),
  tradeoffs: z.string(),
  outcome: z.string(),
  relevantWork: z.array(z.string()).optional(),
  pipeline: z.array(pipelineStepSchema).optional(),
  highlights: z.array(z.string()).optional(),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;

export const principleSchema = z.object({
  key: z.string(),
  title: z.string(),
  body: z.string(),
});
export type Principle = z.infer<typeof principleSchema>;

export const experienceEntrySchema = z.object({
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string().optional(),
  summary: z.string(),
  stack: z.array(z.string()).optional(),
  relevantWork: z.array(z.string()).optional(),
});
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;

export const architectureNoteSchema = z.object({
  heading: z.string(),
  body: z.string(),
});
export type ArchitectureNote = z.infer<typeof architectureNoteSchema>;

export const architectureSchema = z.object({
  summary: z.string(),
  notes: z.array(architectureNoteSchema).min(1),
});
export type Architecture = z.infer<typeof architectureSchema>;
