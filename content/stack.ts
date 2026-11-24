import { stackGroupSchema, type StackGroup } from "./types";

/** Rendered as STACK.CFG on the desktop. */
export const stack: StackGroup[] = [
  { key: "backend", items: ["TypeScript", "Node.js", "NestJS", "Python", "Django"] },
  { key: "data", items: ["PostgreSQL", "Redis"] },
  { key: "cloud", items: ["AWS", "Terraform", "Docker"] },
  { key: "frontend", items: ["React", "Next.js"] },
].map((group) => stackGroupSchema.parse(group));
