import { z } from "zod";

/** Month in `YYYY-MM` form, e.g. "2026-01". */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

export const profileSchema = z.object({
  name: z.string(),
  title: z.string(),
  /** Where you live and work. */
  location: z.string(),
  /** Where you grew up. Shown in the hero and the boot screen. */
  hometown: z.string(),
  email: z.string().email(),
  /** One or two sentences under the name: what you build. */
  lead: z.string(),
  /** Where you work now, in one or two sentences. */
  now: z.string(),
  /** Shown as the status line when set. Remove to hide it. */
  availability: z.string().optional(),
  /** Meta description and JSON-LD description. */
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

export const experienceEntrySchema = z.object({
  company: z.string(),
  role: z.string(),
  start: yearMonth,
  /** Leave out while the job is current. */
  end: yearMonth.optional(),
  /** What you did, one line each. Shown in the job window. */
  highlights: z.array(z.string()).min(1),
  stack: z.array(z.string()).default([]),
  /** Slug of a case study in content/case-studies.ts. */
  caseStudy: z.string().optional(),
});
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;

export const stackGroupSchema = z.object({
  /** Section name, shown as `[key]` in STACK.CFG. */
  key: z.string().regex(/^[a-z]+$/),
  items: z.array(z.string()).min(1),
});
export type StackGroup = z.infer<typeof stackGroupSchema>;

export const sideProjectSchema = z.object({
  name: z.string(),
  /** Window title, in 8.3 style, e.g. "RAG.PRJ". */
  file: z.string().regex(/^[A-Z0-9]{1,8}\.[A-Z]{3}$/, "Use an 8.3 file name like RAG.PRJ"),
  status: z.string(),
  summary: z.string(),
  caseStudy: z.string().optional(),
  links: z
    .object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
    })
    .optional(),
});
export type SideProject = z.infer<typeof sideProjectSchema>;

export const caseStudySectionSchema = z
  .object({
    heading: z.string(),
    paragraphs: z.array(z.string()).optional(),
    items: z.array(z.string()).optional(),
  })
  .refine((section) => section.paragraphs?.length || section.items?.length, {
    message: "A section needs paragraphs or items",
  });
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;

export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Window title, in 8.3 style, e.g. "MANGO.TXT". */
  file: z.string().regex(/^[A-Z0-9]{1,8}\.[A-Z]{3}$/, "Use an 8.3 file name like MANGO.TXT"),
  /** Small line above the title: company, role, dates. */
  kicker: z.string(),
  title: z.string(),
  lead: z.string(),
  glance: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  sections: z.array(caseStudySectionSchema).min(1),
  links: z
    .object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
    })
    .optional(),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;
