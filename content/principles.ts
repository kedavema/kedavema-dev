import { principleSchema, type Principle } from "./types";

export const principles: Principle[] = [
  {
    key: "01",
    title: "Backend architecture",
    body: "Clean architectures and domain-driven design with clear boundaries and maintainable systems.",
  },
  {
    key: "02",
    title: "Production ownership",
    body: "CI/CD, observability, testing and security — the work that keeps systems healthy in production.",
  },
  {
    key: "03",
    title: "Grounded AI",
    body: "Bringing AI features into real products reliably — citations, evaluation, and refusal over guesswork.",
  },
].map((principle) => principleSchema.parse(principle));
