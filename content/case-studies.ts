import { caseStudySchema, type CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    projectSlug: "ai-knowledge-rag",
    problem:
      "Build a reliable document Q&A system that answers only from ingested documents, always cites sources, and refuses when context is insufficient.",
    approach:
      "Implement ingestion, chunking, embeddings, retrieval, answer generation with mandatory citations, and refusal behavior — a deterministic pipeline, not an agent loop.",
    architectureNotes:
      "Separate ingestion pipeline, retrieval layer, answer generation service, evaluation/tests, and API boundaries. Async SQLAlchemy + Alembic handle schema evolution; the LLM provider is abstracted/decoupled so it isn't hard-locked to OpenAI.",
    tradeoffs:
      "Start with a simple, deterministic MVP architecture (no multi-agent orchestration) and prioritize retrieval quality, grounding, and evaluation over agentic complexity.",
    outcome:
      "Ships describing the current state: deterministic architecture, ingestion/retrieval/generation/evaluation layers, mandatory citations, refusal behavior. Planned deployment: Vercel for frontend, Render for backend, Neon for Postgres/pgvector — final deployment pending. Live demo, screenshots, and evaluation metrics are a fast-follow, not a blocker.",
  },
  {
    projectSlug: "coderhouse",
    problem:
      "Build and maintain core platform capabilities while supporting multiple vertical business modules across backend, frontend, and infrastructure.",
    approach:
      "Contributed to a TypeScript microservices monorepo with shared conventions, tooling, CI/CD, and domain-oriented modules.",
    architectureNotes:
      "High-level notes on monorepo structure, NestJS services, Prisma/PostgreSQL data access, Redis/Valkey usage, frontend integration, RBAC, OTP authentication, and AWS infrastructure managed through Terraform.",
    tradeoffs:
      "Keep the description high-level and professional — focus on ownership, architecture, maintainability, and production impact without exposing confidential implementation details.",
    outcome:
      "Concrete metrics not yet confirmed for public use — description stays scoped to ownership and architecture until safe, confirmed outcomes are available.",
    relevantWork: [
      "Certificate issuance",
      "Licensing and subscriptions",
      "Staff/instructor management",
      "Backoffice reporting",
      "Centralized RBAC",
      "OTP authentication migration",
    ],
  },
  {
    projectSlug: "monchis",
    problem:
      "Support delivery platform features requiring reliable APIs, payment flows, merchant/product data, backoffice workflows, and improved backend performance.",
    approach:
      "Implemented and optimized RESTful APIs on AWS Lambda and API Gateway, integrated payment methods, improved database performance, and used Redis caching.",
    architectureNotes:
      "High-level notes on serverless API endpoints, purchase and cancellation flows, payment integrations, caching strategy, database optimization, and backoffice/admin workflows.",
    tradeoffs:
      "Focus on practical backend impact — performance, reliability, integrations, and operational workflows.",
    outcome: "Response time reduction of up to 40% (confirmed). Additional metrics not yet confirmed.",
    relevantWork: [
      "RESTful APIs on AWS Lambda/API Gateway",
      "Response time improvements up to 40%",
      "Pix/PagoPar payment integrations",
      "Upay payment integration",
      "Purchase and cancellation flows",
      "SQL query optimization",
      "Redis caching",
      "Personalized top products",
      "Merchant rankings",
      "Merchant activation/deactivation workflows",
      "Push notification migration to Google HTTP v1",
      "CSV-based product update workflows",
    ],
  },
].map((caseStudy) => caseStudySchema.parse(caseStudy));
