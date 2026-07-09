# Content Inventory — Portfolio (M0)

Status: draft for review. This document is the single source of real content that will be typed into `content/` during M1. Nothing here is placeholder text; anything not yet confirmed is marked **TODO**.

---

## 1. Profile

- **Name:** Kevin Velázquez
- **Title (portfolio hero/main title):** Backend-focused Full-stack Engineer — **decided.** "Senior" is not used as the main title; it appears only inside the professional experience entry ("Coderhouse — Senior Fullstack Engineer") where it's tied to the actual role.
- **Location:** Paraguay (GMT-3)
- **Email:** kedavema@gmail.com

**Summary (decided — this is the one that ships):**
Backend-focused full-stack developer with 4+ years of experience building production web platforms end-to-end. Experience spans backend services, frontend applications, cloud infrastructure, CI/CD, authentication, payments, internal tools, and AI-powered features. Strongest focus: backend architecture, TypeScript, Node.js/NestJS, Python/Django/FastAPI, PostgreSQL, AWS serverless, clean architectures, domain-driven design, and production ownership.

**Summary (CV version, for reference only — not used):**
Software Engineer with 4+ years of experience building production web platforms end-to-end. At Coderhouse I helped shape a new core platform from day one and now own vertical features spanning backend, frontends and AWS infrastructure. Previously shipped delivery and fintech products in Node.js, Django and React. Focused on TypeScript, domain-driven design, and clean architectures.

---

## 2. Links

- **Email:** kedavema@gmail.com
- **GitHub:** https://github.com/kedavema
- **LinkedIn:** https://www.linkedin.com/in/velazquez-kevin/
- **Resume PDF:** provided (`Kevin_Velazquez_CV_EN.pdf`) — TODO: copy final file into the project (e.g. `public/resume.pdf`) during M1 and confirm this is the version to publish
- **Calendly:** **decided — not included for now.** No public Calendly link on the portfolio.

---

## 3. Skills

**Backend**
TypeScript, JavaScript, Python, SQL, Node.js, NestJS, Express, Django, Django Rest Framework, FastAPI, Flask, REST APIs, API design, Clean Architecture, Domain-Driven Design, System design

**Databases**
PostgreSQL, MySQL, MongoDB, Redis, Valkey, Prisma, SQL query optimization, pgvector (confirmed relevant — used in AI Knowledge RAG per stack details below)

**Cloud / Infrastructure**
AWS (Lambda, API Gateway, S3, Secrets Manager, Amplify), Docker, Terraform, CI/CD, GitHub Actions, Serverless architecture, Vercel, Render (used for AI Knowledge RAG deploy), Neon (Postgres/pgvector hosting for AI Knowledge RAG). **Datadog and Sentry removed — decided not to include them.**

**Frontend**
React, Next.js 15, React Native, Tailwind CSS (v4 used in AI Knowledge RAG), shadcn/ui, Bootstrap, Redux, Zustand, react-hook-form, Zod

**AI / LLM**
RAG (deterministic, non-multi-agent design), OpenAI (LLM + embeddings provider, decoupled/configurable by design), document ingestion, retrieval, grounding with mandatory citations, refusal behavior, AI-assisted development. LangGraph / structured outputs / formal evaluation: **TODO — not confirmed in CV or latest project description; only include if actually used in AI Knowledge RAG.**

**Integrations / Platforms** *(secondary category — not core skills; from CV, used in past projects, not to be highlighted as primary competencies)*
Firebase, Heroku, Clerk, Intercom, Vimeo API, Stripe, Calendly, OpenAI

**Core skills (for portfolio emphasis — decided)**
TypeScript, Node.js, NestJS, Python, Django/FastAPI, PostgreSQL, AWS, Docker, Terraform, Redis/Valkey, Next.js, React, RAG.

**Tools**
Nx Monorepo, Yarn, Vite, Jest, Pytest, Postman, DBeaver, VS Code, Git, Jira, Docker Compose (local dev)

**Languages**
- Spanish: Native
- English: **decided.** "B2 Upper Intermediate (EF SET 57/100, 2024), comfortable in professional conversations." Do not use "Fluent" alone for now.

---

## 4. Featured Projects / Case Studies

Order matters — this is the display order for the `projects` command and `/projects`.

### 4.1 AI Knowledge RAG *(first featured project)*

- **Type:** Personal/current project
- **Summary:** A production-oriented, deterministic RAG application (not multi-agent) focused on document ingestion, retrieval, grounding, and evaluation, with mandatory citations and refusal behavior when context is insufficient.
- **Stack (confirmed):**
  - Backend: Python + FastAPI, PostgreSQL + pgvector (embeddings/retrieval), SQLAlchemy (async) + Alembic for migrations, OpenAI as LLM/embeddings provider (configurable/decoupled by design), pytest for tests.
  - Frontend: Next.js + TypeScript, Tailwind v4, react-markdown + remark-gfm + rehype-highlight (Markdown responses with syntax highlighting), Vitest + Testing Library + MSW for tests.
  - Infra: Docker Compose for local dev (backend + frontend + db). **Planned deployment: Vercel for frontend, Render for backend, Neon for Postgres/pgvector. Final deployment pending** — configured in `render.yaml` / `docs/DEPLOY.md`, not yet live. Do not word this as already deployed.
  - Architecture: deterministic RAG (no multi-agent), separated layers for ingestion / retrieval / generation / evaluation; every answer carries mandatory citations, with refusal when context is insufficient.

**Case study outline:**
- **Problem:** Build a reliable document Q&A system that answers only from ingested documents, always cites sources, and refuses when context is insufficient.
- **Approach:** Implement ingestion, chunking, embeddings, retrieval, answer generation with mandatory citations, and refusal behavior — deterministic pipeline, not an agent loop.
- **Architecture notes:** Separate ingestion pipeline, retrieval layer, answer generation service, evaluation/tests, and API boundaries; async SQLAlchemy + Alembic for schema evolution; LLM provider abstracted/decoupled so it isn't hard-locked to OpenAI.
- **Tradeoffs:** Start with a simple, deterministic MVP architecture (no multi-agent orchestration) and prioritize retrieval quality, grounding, and evaluation over agentic complexity.
- **Outcome:** **Ship with what exists now.** Deploy is still pending (Vercel/Render/Neon configured but not live) — the case study will be published describing the current state (deterministic architecture, ingestion/retrieval/generation/evaluation layers, mandatory citations, refusal behavior) without a live demo link. Deploy, screenshots, repo link, and evaluation metrics will be added later as a follow-up update, not a blocker for M0/M1.

### 4.2 Coderhouse — Core Platform / Internal Modules

- **Type:** Professional experience
- **Summary:** Professional work on a production platform involving a TypeScript microservices monorepo, backend modules, frontend applications, CI/CD, authentication, RBAC, and AWS infrastructure.
- **Stack:** TypeScript, NestJS, Nx, Prisma, PostgreSQL, Valkey/Redis, Next.js 15, React, Docker, Terraform, AWS.
- **Employment dates:** Apr 2025 – Present. Role title per CV (used inside this experience entry, not as the portfolio's main title): Senior Fullstack Engineer. Note: "Present" will drift over time — only revisit if the CV/portfolio dates are updated later; not a blocking TODO for M0.

**Case study outline:**
- **Problem:** Build and maintain core platform capabilities while supporting multiple vertical business modules across backend, frontend, and infrastructure.
- **Approach:** Contributed to a TypeScript microservices monorepo with shared conventions, tooling, CI/CD, and domain-oriented modules.
- **Architecture notes:** High-level notes on monorepo structure, NestJS services, Prisma/PostgreSQL data access, Redis/Valkey usage, frontend integration, RBAC, OTP authentication, and AWS infrastructure managed through Terraform.
- **Relevant modules:** certificate issuance; licensing and subscriptions; staff/instructor management; backoffice reporting; centralized RBAC; OTP authentication migration.
- **Tradeoffs:** Keep the description high-level and professional — focus on ownership, architecture, maintainability, and production impact without exposing confidential implementation details.
- **Outcome:** TODO — add concrete but safe outcomes, metrics, links, or screenshots if available. Do not invent metrics.

### 4.3 Monchis — Delivery Backend

- **Type:** Professional experience
- **Summary:** Backend work on a delivery platform involving RESTful APIs, AWS serverless infrastructure, payment integrations, purchase/cancellation flows, caching, and performance optimization.
- **Stack:** Node.js, ReactJS, MongoDB, PostgreSQL, AWS Lambda, API Gateway, AWS S3, Redis, GitHub, Jira.
- **Employment dates:** Jun 2023 – Apr 2025 (confirmed from CV). Role title per CV: Backend Developer.

**Case study outline:**
- **Problem:** Support delivery platform features requiring reliable APIs, payment flows, merchant/product data, backoffice workflows, and improved backend performance.
- **Approach:** Implemented and optimized RESTful APIs on AWS Lambda and API Gateway, integrated payment methods, improved database performance, and used Redis caching.
- **Architecture notes:** High-level notes on serverless API endpoints, purchase and cancellation flows, payment integrations, caching strategy, database optimization, and backoffice/admin workflows.
- **Relevant work:** RESTful APIs on AWS Lambda/API Gateway; response time improvements up to 40%; Pix/PagoPar payment integrations; Upay payment integration; purchase and cancellation flows; SQL query optimization; Redis caching; personalized top products; merchant rankings; merchant activation/deactivation workflows; push notification migration to Google HTTP v1; CSV-based product update workflows.
- **Tradeoffs:** Focus on practical backend impact — performance, reliability, integrations, and operational workflows.
- **Outcome:** Response time reduction of up to 40% (confirmed, from CV). All other metrics: TODO.

---

## 5. Professional Experience

Additional experience entries. **Decided: Más Money and Penguin Academy are experience-only entries, not featured case studies.** They won't get a `case-study <slug>` / `/projects/[slug]` page — they appear in the resume/experience listing only.

### Más Money Platform *(previous experience)*

- **Type:** Previous full-stack experience
- **Summary:** Full-stack work on a course/consultation platform involving Django/DRF backend, React frontend, payments, scheduling, video integration, user profiles, and an OpenAI-powered chatbot interface.
- **Stack:** Django, Django Rest Framework, React, Tailwind CSS, Stripe, Calendly, Vimeo, OpenAI, PostgreSQL.
- **Employment dates:** Oct 2021 – Jun 2023 (confirmed from CV). Role title per CV: Full-Stack Developer.
- **Relevant work:** course listing; course details; profile sections; Vimeo video streaming integration; Stripe payments; Calendly scheduling; user profiles; OpenAI chatbot interface; responsive frontend with React and Tailwind CSS.

### Penguin Academy *(mentoring / coaching experience)*

- **Type:** Mentoring / coaching experience
- **Summary:** Programming coaching and mentoring experience with hackathon teams, agile practices, Flask, Django, Tailwind CSS, APIs, and MVP creation (Design Thinking for MVP creation, per CV).
- **Employment dates:** Apr 2022 – Oct 2022 (confirmed from CV). Role title per CV: Programming Coach.

### Education & Certifications

**Decided: not included on the portfolio.** Education and certifications (Universidad Nacional de Asunción, freeCodeCamp, Udemy courses, Platzi courses, EF SET English certificate) exist in the CV but will not appear on the site — they stay in the downloadable resume PDF only.

---

## 6. Architecture Narrative (for this portfolio site itself)

The portfolio itself is **not** a featured project — it appears only here, as the subject of the `architecture` command/page.

The site demonstrates backend-oriented thinking through its internal architecture, not only its visual design. It includes:

- Terminal-inspired UI with clickable commands for recruiter-friendly navigation.
- A curated command registry instead of a real shell emulator.
- A typed local content layer.
- Zod schemas for content and contact validation.
- A repository-style abstraction for content access.
- Static routes for SEO and accessibility: `/`, `/about`, `/projects`, `/projects/[slug]`, `/resume`, `/contact`.
- A small serverless contact flow using a Next.js Route Handler or Server Action.
- Resend email integration.
- Honeypot spam protection.
- Graceful fallback to direct email/LinkedIn/GitHub links.
- Tests for command parsing, content validation, and contact validation.
- CI and Vercel deployment.

**What the `architecture` page should explain:**
- Why the portfolio uses a curated command set instead of full shell emulation.
- Why content starts as typed local files instead of a CMS or custom backend.
- How static routes keep SEO and accessibility independent from the terminal UI.
- How the contact form demonstrates a small backend slice without overengineering.
- How the structure could evolve later into API-backed content or richer case studies.

---

## 7. TODOs / Missing Information

**Resolved — round 1 (from CV + links provided):**
- ~~GitHub profile URL~~ → https://github.com/kedavema
- ~~LinkedIn profile URL~~ → https://www.linkedin.com/in/velazquez-kevin/
- ~~Resume PDF~~ → provided, needs to be copied into the project during M1
- ~~Coderhouse dates~~ → Apr 2025 – Present
- ~~Monchis dates~~ → Jun 2023 – Apr 2025
- ~~Más Money dates~~ → Oct 2021 – Jun 2023
- ~~Penguin Academy dates~~ → Apr 2022 – Oct 2022
- ~~AI Knowledge RAG stack~~ → confirmed in full (see Section 4.1)
- ~~pgvector relevance~~ → confirmed, used in AI Knowledge RAG

**Resolved — round 2:**
- ~~Portfolio title~~ → "Backend-focused Full-stack Engineer" as the main title; "Senior Fullstack Engineer" kept only inside the Coderhouse experience entry
- ~~English level wording~~ → "B2 Upper Intermediate (EF SET 57/100, 2024), comfortable in professional conversations"
- ~~Firebase/Heroku/Clerk/Intercom/Vimeo API~~ → moved to secondary "Integrations / Platforms" category, alongside Stripe/Calendly/OpenAI; not treated as core skills
- ~~RAG deploy wording~~ → standardized to "Planned deployment: Vercel for frontend, Render for backend, Neon for Postgres/pgvector. Final deployment pending."
- ~~Coderhouse "Present" date~~ → kept as-is; explicitly not a blocking TODO, only revisit if the CV itself is updated later

**Resolved — round 3 (this review):**
- ~~Profile summary~~ → original dictation confirmed as the one that ships
- ~~Calendly~~ → not included for now
- ~~AI Knowledge RAG outcome~~ → ship the case study describing the current state as-is; deploy/screenshots/repo link/metrics are a follow-up, not a blocker
- ~~Más Money / Penguin Academy~~ → confirmed experience-only, no case-study pages
- ~~Datadog / Sentry~~ → removed from skills entirely
- ~~Education & Certifications~~ → confirmed not included on the portfolio; resume PDF only

**Still open (deferred to a later round, not blocking M0 close):**
- [ ] Coderhouse: any safe/confirmed outcomes or metrics beyond the ownership/architecture description — do not invent
- [ ] Monchis: any additional confirmed metrics beyond the 40% response-time improvement
- [ ] AI Knowledge RAG: real deploy, screenshots, confirmed repo name/link, evaluation metrics — explicit fast-follow after M0/M1, not required to close M0

M0 content is otherwise considered **closed** pending your final go-ahead to start M1.
