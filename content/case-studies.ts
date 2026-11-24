import { caseStudySchema, type CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "mango",
    file: "MANGO.TXT",
    kicker: "Mango Payment · Backend Engineer · Jan 2026 – now",
    title: "An identity check that never gets stuck halfway",
    lead: "Mango is a digital wallet in Paraguay. Before someone can use it, we confirm who they are and that they don't already have an account. I work on the backend of that onboarding.",
    glance: [
      { label: "Role", value: "Backend Engineer" },
      { label: "Area", value: "KYC onboarding · account security" },
      { label: "Testing & docs", value: "Vitest · OpenAPI" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Verification depends on outside services that can be slow or fail, and the same person sometimes tries to register twice. A new user can't be left waiting forever, and a duplicate account can't slip through.",
        ],
      },
      {
        heading: "What I built",
        items: [
          "Face matching against existing accounts, so duplicate registrations go to a review queue instead of being approved.",
          "An asynchronous verification flow with retries, concurrency limits and atomic state changes, so two workers never process the same check.",
          "Expiry and recovery paths: a check that times out lands in a known state and can be picked up again.",
          "Back-office APIs, dashboard endpoints and an audit history for the team that investigates flagged cases.",
          "Trusted-device registration, sign-in, password recovery and the handling of biometric exceptions.",
          "Vitest coverage and OpenAPI docs for the verification and identity flows.",
        ],
      },
    ],
  },
  {
    slug: "ai-knowledge-rag",
    file: "RAG.TXT",
    kicker: "Side project · 2026 · in progress",
    title: "Answers from your own documents, with sources",
    lead: "A question-answering service over a set of documents. Every answer cites the passages it used, and when the documents don't cover the question it says so instead of guessing.",
    glance: [
      { label: "Status", value: "In progress" },
      { label: "Backend", value: "Python · FastAPI · PostgreSQL + pgvector" },
      { label: "Frontend", value: "Next.js · TypeScript" },
      { label: "Tests", value: "pytest · Vitest" },
    ],
    sections: [
      {
        heading: "The goal",
        paragraphs: [
          "A document Q&A service that only answers from what it has ingested, always cites its sources, and refuses when the retrieved context isn't enough to answer.",
        ],
      },
      {
        heading: "How it works",
        items: [
          "Ingestion parses and chunks documents, then stores their embeddings in PostgreSQL with pgvector, next to the relational metadata.",
          "Retrieval picks the most relevant chunks and builds a prompt limited to that context.",
          "Generation has to cite the chunks it used, and refuses when retrieval comes back weak.",
          "An evaluation suite in pytest checks grounding and answer quality on every change.",
          "The model provider sits behind an interface, so it can be swapped without touching the pipeline.",
        ],
      },
      {
        heading: "Why it's built this way",
        paragraphs: [
          "It's a fixed pipeline with no agent loop. The same question goes through the same steps, which makes it easy to test, and for this kind of tool retrieval quality matters more than autonomy. Async SQLAlchemy and Alembic keep the schema easy to evolve.",
        ],
      },
    ],
  },
].map((caseStudy) => caseStudySchema.parse(caseStudy));
