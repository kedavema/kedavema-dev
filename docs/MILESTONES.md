# Milestones

Status tracker for the portfolio build. **Read this file first when resuming a session** — it's the cheapest way to know what's done and what's next without re-reading the whole conversation history.

Full plan/rationale: see `docs/content-inventory.md` for M0 content, and the original implementation plan (architecture, tech stack, acceptance criteria per milestone) saved in project memory under topic `architecture/portfolio-plan`.

Execution rule: one milestone at a time, commit at the end of each, stop and review before starting the next.

---

## M0 — Content Inventory ✅ done

Real content (profile, links, skills, featured projects/case studies, experience, architecture narrative) gathered and confirmed. See `docs/content-inventory.md` for the full source of truth.

## M1 — Scaffold & Content Layer ✅ done

- Next.js 16 (App Router) + TypeScript + Tailwind v4 scaffolded via `create-next-app`, pnpm as package manager.
- Typed content layer: `content/types.ts` (Zod schemas) + `content/{profile,links,skills,projects,case-studies,experience}.ts` populated with real M0 content.
- Repository layer: `src/lib/content.ts` — all UI reads content through this, never raw imports.
- Static routes (no terminal yet): `/`, `/about`, `/projects`, `/projects/[slug]`, `/resume`, `/contact`.
- `public/resume.pdf` copied in from the provided CV.
- Verified: `pnpm build` and `pnpm lint` clean; every route manually checked with the dev server for real rendered content; Zod validation confirmed to fail the build clearly on bad content (tested and reverted).

**Gotcha for later:** Next.js 16 App Router route `params` are async (`Promise<Params>`) — dynamic route pages must `await params`, otherwise it silently 404s in dev even though the production SSG build looks fine (`generateStaticParams` pre-resolves it, hiding the bug). Already fixed in `src/app/projects/[slug]/page.tsx`.

## M2 — Terminal Core ⏳ not started

Command registry + parser, `TerminalShell`/`CommandLine`/`CommandOutput`, `help`/`about`/`clear`, required history, clickable chips wired to the same command dispatch as typed input. Autocomplete only if trivial.

## M3 — Content Commands ⏳ not started

`skills`, `projects`, `case-study <slug>`, `architecture` (meta page), `resume` — all backed by the same `lib/content.ts` used by the static routes.

## M4 — Contact Slice ⏳ not started

`contact` command/panel, Route Handler/Server Action + Zod validation + honeypot + Resend integration, graceful fallback UI. Rate limiting and contact analytics deferred.

## M5 — Responsive, A11y, SEO Pass ⏳ not started

Mobile layout pass, `prefers-reduced-motion`, aria-live wiring, `generateMetadata`/sitemap/JSON-LD across the static routes.

## M6 — Testing & Deploy ⏳ not started

Unit/component/e2e/axe coverage, GitHub Actions CI, Vercel production deploy, analytics wired.

---

## Deferred / fast-follow items (not blocking any milestone)

- AI Knowledge RAG: real deploy, screenshots, repo link, evaluation metrics.
- Coderhouse / Monchis: additional safe metrics if they become available (do not invent).
- Calendly link, Education/Certifications on-site: explicitly excluded from the portfolio for now.
