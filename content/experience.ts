import { experienceEntrySchema, type ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    company: "Coderhouse",
    role: "Senior Fullstack Engineer",
    start: "Apr 2025",
    summary:
      "Bootstrapped and maintained a TypeScript microservices monorepo, defining project structure, conventions, CI/CD and tooling. Owned multiple vertical modules end-to-end. Led security and infrastructure initiatives.",
    stack: ["TypeScript", "NestJS", "Nx", "Prisma", "PostgreSQL", "Valkey/Redis", "Next.js 15", "React", "Docker", "Terraform", "AWS"],
  },
  {
    company: "Monchis Delivery App",
    role: "Backend Developer",
    start: "Jun 2023",
    end: "Apr 2025",
    summary:
      "Implemented and optimized RESTful APIs on AWS Lambda/API Gateway, reducing response times by up to 40%. Integrated new payment methods and designed key endpoints for purchase and cancellation flows.",
    stack: ["ReactJS", "Node.js", "MongoDB", "PostgreSQL", "API Gateway", "AWS Lambda", "AWS S3", "Redis"],
  },
  {
    company: "Más Money",
    role: "Full-Stack Developer",
    start: "Oct 2021",
    end: "Jun 2023",
    summary:
      "Delivered a responsive course/consultation platform: course listing, details, and profile sections with Vimeo video streaming. Implemented Django/DRF backend powering payments, scheduling, and user profiles. Built a chatbot interface with React and Tailwind CSS integrating OpenAI.",
    stack: ["Django", "Django Rest Framework", "React", "Tailwind CSS", "Stripe", "Calendly", "Vimeo", "OpenAI", "PostgreSQL"],
  },
  {
    company: "Penguin Academy",
    role: "Programming Coach",
    start: "Apr 2022",
    end: "Oct 2022",
    summary:
      "Led hackathon teams and mentored developers in agile practices and web technologies. Conducted workshops on building web apps with APIs and applied Design Thinking for MVP creation.",
    stack: ["Flask", "Django", "Tailwind CSS"],
  },
].map((entry) => experienceEntrySchema.parse(entry));
