import { profileSchema, type Profile } from "./types";

export const profile: Profile = profileSchema.parse({
  name: "Kevin Velázquez",
  title: "Backend-focused Full-stack Engineer",
  location: "Paraguay (GMT-3)",
  email: "kedavema@gmail.com",
  summary:
    "Backend-focused full-stack developer with 4+ years of experience building production web platforms end-to-end. Experience spans backend services, frontend applications, cloud infrastructure, CI/CD, authentication, payments, internal tools, and AI-powered features. Strongest focus: backend architecture, TypeScript, Node.js/NestJS, Python/Django/FastAPI, PostgreSQL, AWS serverless, clean architectures, domain-driven design, and production ownership.",
});
