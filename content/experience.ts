import { experienceEntrySchema, type ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    company: "Mango Payment",
    role: "Backend Engineer",
    start: "2026-01",
    highlights: [
      "Face matching against existing accounts, so duplicate registrations go to a review queue.",
      "An asynchronous verification flow with retries, concurrency limits and atomic state changes.",
      "Expiry and recovery paths, so a check that times out can be picked up again.",
      "Back-office APIs, dashboard endpoints and an audit history for investigators.",
      "Trusted-device registration, sign-in, password recovery and biometric exceptions.",
    ],
    stack: ["Vitest", "OpenAPI"],
    caseStudy: "mango",
  },
  {
    company: "Coderhouse",
    role: "Senior Full-Stack Engineer",
    start: "2025-01",
    end: "2025-12",
    highlights: [
      "Helped set up the TypeScript monorepo for the new core platform: Nx, NestJS, conventions and CI.",
      "Owned certificates, subscriptions, staff management and reporting.",
      "Contributed to a vector-retrieval knowledge assistant.",
      "Rolled out centralized role-based access and one-time-code sign-in.",
      "Managed AWS infrastructure through Terraform.",
    ],
    stack: ["TypeScript", "NestJS", "Nx", "Prisma", "PostgreSQL", "Redis", "Next.js", "Terraform", "AWS"],
  },
  {
    company: "Monchis",
    role: "Backend Developer",
    start: "2023-06",
    end: "2024-12",
    highlights: [
      "REST APIs and serverless services on AWS Lambda and API Gateway for ordering and checkout.",
      "Pix, PagoPar and Upay payment integrations.",
      "Purchase and cancellation flows.",
      "SQL tuning and Redis caching on slow endpoints.",
    ],
    stack: ["Node.js", "MongoDB", "PostgreSQL", "AWS Lambda", "API Gateway", "S3", "Redis"],
  },
  {
    company: "Más Money",
    role: "Full-Stack Developer",
    start: "2021-10",
    end: "2023-06",
    highlights: [
      "React course platform with profiles and Vimeo video.",
      "Django REST services for Stripe payments and Calendly scheduling.",
      "A chat assistant on the OpenAI API.",
    ],
    stack: ["Django", "DRF", "React", "Tailwind CSS", "Stripe", "PostgreSQL"],
  },
  {
    company: "Penguin Academy",
    role: "Programming Coach",
    start: "2022-04",
    end: "2022-10",
    highlights: ["Mentored hackathon teams and developers on web apps, APIs and MVP delivery."],
    stack: ["Flask", "Django", "Tailwind CSS"],
  },
].map((entry) => experienceEntrySchema.parse(entry));
