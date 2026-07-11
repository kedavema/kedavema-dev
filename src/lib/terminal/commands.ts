import {
  getArchitecture,
  getCaseStudyBySlug,
  getFeaturedProjects,
  getLinks,
  getProfile,
  getProjectBySlug,
  getProjects,
  getSkillGroups,
} from "@/lib/content";
import { parseCommand } from "./parser";
import type { Command, CommandContext, CommandOutputLine, CommandResult } from "./types";

const NAV_CHIPS = ["skills", "projects", "architecture", "resume"];

function caseStudySlugs(): string[] {
  return getProjects()
    .filter((project) => getCaseStudyBySlug(project.slug))
    .map((project) => project.slug);
}

const commands: Command[] = [
  {
    name: "help",
    description: "list available commands",
    run: () => {
      const lines: CommandOutputLine[] = [
        { kind: "text", value: "Available commands:" },
        ...registry.map((command) => ({
          kind: "text" as const,
          value: `  ${command.name.padEnd(14)} ${command.description}`,
        })),
      ];
      return { lines };
    },
  },
  {
    name: "about",
    description: "short intro",
    run: () => {
      const profile = getProfile();
      return {
        lines: [
          { kind: "text", value: `${profile.name} — ${profile.title}` },
          { kind: "text", value: profile.location },
          { kind: "text", value: profile.summary },
        ],
      };
    },
  },
  {
    name: "skills",
    description: "list core skills",
    run: () => {
      const groups = getSkillGroups();
      const lines: CommandOutputLine[] = [{ kind: "text", value: "Skills:" }];
      for (const group of groups) {
        lines.push({ kind: "muted", value: "" });
        lines.push({ kind: "text", value: group.category });
        lines.push({ kind: "muted", value: `  ${group.items.join(", ")}` });
      }
      return { lines, chips: NAV_CHIPS.filter((chip) => chip !== "skills") };
    },
  },
  {
    name: "projects",
    description: "list featured projects",
    run: () => {
      const featured = getFeaturedProjects();
      const lines: CommandOutputLine[] = [{ kind: "text", value: "Featured projects:" }];
      const chips: string[] = [];

      for (const project of featured) {
        lines.push({ kind: "muted", value: "" });
        lines.push({ kind: "text", value: `${project.name} (${project.slug})` });
        lines.push({ kind: "muted", value: `  ${project.summary}` });
        lines.push({ kind: "muted", value: `  stack: ${project.stack.join(", ")}` });

        if (getCaseStudyBySlug(project.slug)) {
          lines.push({ kind: "muted", value: `  → case-study ${project.slug}` });
          chips.push(`case-study ${project.slug}`);
        }
      }

      chips.push("architecture", "resume");
      return { lines, chips };
    },
  },
  {
    name: "case-study",
    description: "show a project case study",
    run: (args) => {
      const slugs = caseStudySlugs();
      const slug = args[0];

      if (!slug) {
        return {
          lines: [
            { kind: "text", value: "Usage: case-study <slug>" },
            { kind: "muted", value: `Available: ${slugs.join(", ")}` },
          ],
          chips: slugs.map((s) => `case-study ${s}`),
        };
      }

      const caseStudy = getCaseStudyBySlug(slug);
      const project = getProjectBySlug(slug);

      if (!caseStudy || !project) {
        return {
          lines: [
            { kind: "muted", value: `No case study found for "${slug}".` },
            { kind: "muted", value: `Available: ${slugs.join(", ")}` },
          ],
          chips: slugs.map((s) => `case-study ${s}`),
        };
      }

      return {
        lines: [
          { kind: "text", value: project.name },
          { kind: "muted", value: "" },
          { kind: "text", value: "Problem" },
          { kind: "muted", value: `  ${caseStudy.problem}` },
          { kind: "text", value: "Approach" },
          { kind: "muted", value: `  ${caseStudy.approach}` },
          { kind: "text", value: "Architecture" },
          { kind: "muted", value: `  ${caseStudy.architectureNotes}` },
          { kind: "text", value: "Stack" },
          { kind: "muted", value: `  ${project.stack.join(", ")}` },
          { kind: "text", value: "Outcome" },
          { kind: "muted", value: `  ${caseStudy.outcome}` },
        ],
        chips: ["projects", "architecture", "resume"],
      };
    },
  },
  {
    name: "architecture",
    description: "explain this site's architecture",
    run: () => {
      const architecture = getArchitecture();
      const lines: CommandOutputLine[] = [{ kind: "text", value: architecture.summary }];

      for (const note of architecture.notes) {
        lines.push({ kind: "muted", value: "" });
        lines.push({ kind: "text", value: note.heading });
        lines.push({ kind: "muted", value: `  ${note.body}` });
      }

      return { lines, chips: NAV_CHIPS.filter((chip) => chip !== "architecture") };
    },
  },
  {
    name: "resume",
    description: "view/download resume",
    run: () => {
      const profile = getProfile();
      const links = getLinks();
      return {
        lines: [
          { kind: "text", value: `${profile.name} — ${profile.title}` },
          { kind: "muted", value: profile.summary },
          { kind: "muted", value: "" },
          { kind: "text", value: `Download: ${links.resumeUrl}` },
          { kind: "muted", value: "Also available at the /resume page." },
        ],
        chips: ["skills", "projects", "contact"],
      };
    },
  },
  {
    name: "contact",
    description: "reach out via form or direct links",
    run: () => {
      const links = getLinks();
      return {
        lines: [
          { kind: "text", value: `Email: ${links.email}` },
          { kind: "text", value: `GitHub: ${links.github}` },
          { kind: "text", value: `LinkedIn: ${links.linkedin}` },
          { kind: "muted", value: "" },
          { kind: "muted", value: "Or use the form below:" },
        ],
        panel: "contact",
        chips: ["projects", "resume"],
      };
    },
  },
  {
    name: "clear",
    description: "clear the terminal",
    run: () => ({ lines: [], clear: true }),
  },
];

const registry = commands;

export function getCommands(): Command[] {
  return registry;
}

export function executeCommand(raw: string, ctx: CommandContext): CommandResult {
  const parsed = parseCommand(raw);
  if (!parsed) {
    return { lines: [] };
  }

  const command = registry.find((c) => c.name === parsed.name);
  if (!command) {
    return {
      lines: [
        {
          kind: "muted",
          value: `command not found: ${parsed.name} (try "help")`,
        },
      ],
    };
  }

  return command.run(parsed.args, ctx);
}
