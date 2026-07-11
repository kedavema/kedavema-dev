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

## M2 — Terminal Core ✅ done

- Command registry + parser: `src/lib/terminal/{types,parser,commands}.ts`.
- UI: `src/components/terminal/{TerminalShell,CommandLine,CommandOutput,CommandChips}.tsx`.
- Commands implemented: `help` (lists M2 commands + "coming soon" M3 preview), `about` (reads `getProfile()` from `src/lib/content.ts`), `clear`.
- Keyboard history (ArrowUp/ArrowDown) + Enter dispatch in `CommandLine`; chips call the exact same `dispatch` function in `TerminalShell` as typed input.
- No autocomplete — skipped as non-trivial for the acceptance bar.
- No storage: history/output live only in `TerminalShell` component state, reset on page reload.
- Integrated into `/` homepage, replacing the static "coming in M2" placeholder; static routes untouched.
- Verified: `pnpm lint` and `pnpm build` clean.

## M3 — Content Commands ✅ done

- Terminal commands backed by `src/lib/content.ts`: `skills`, `projects`, `case-study <slug>`, `architecture`, `resume`.
- Verified: `pnpm lint` and `pnpm build` clean.

## M4 — Contact Slice ✅ done

- Contact form on `/contact` and `contact` terminal command/panel, both hitting `POST /api/contact` (`src/app/api/contact/route.ts`).
- Shared Zod validation in `src/lib/contact/schema.ts`, honeypot field, Resend wrapper in `src/lib/contact/sendContactEmail.ts`.
- Graceful fallback UI when Resend env vars are missing or sending fails.
- Rate limiting and contact analytics deferred (out of scope).

## M5 — Responsive, A11y, SEO Pass ✅ done

- Mobile layout pass across all static routes and terminal UI: `break-words`/`break-all` on long text (URLs, slugs, stacks), touch-target sizing on chips/buttons, responsive resume iframe height.
- `prefers-reduced-motion` respected globally (`src/app/globals.css`).
- Terminal output wired with `role="log"` + `aria-live="polite"` (`CommandOutput.tsx`); accessible labels on command input and chips; visible focus rings on all interactive elements (fixed a real bug: form inputs had `outline-none` with no focus replacement).
- Contact form errors wired with `aria-invalid`/`aria-describedby`/`role="alert"`; success/fallback states use `role="status"`.
- Skip-to-content link added in `layout.tsx`.
- `generateMetadata`/static metadata sourced from `getProfile()` via the content layer on all static routes.
- Sitemap (`src/app/sitemap.ts`) covering all static routes + project slugs from `getProjects()`.
- JSON-LD (`src/lib/seo/jsonLd.tsx`): Person + WebSite on the homepage, SoftwareSourceCode per project detail page — no invented data, only content-layer fields.
- `getSiteUrl()` (`src/lib/seo/site.ts`) reads `NEXT_PUBLIC_SITE_URL`, falls back to `http://localhost:3000` — **set the env var once a production domain exists**.
- Verified: `pnpm lint` and `pnpm build` clean; sitemap.xml and JSON-LD manually checked against a production build.

## M6 — Testing & Deploy ⏳ not started

Unit/component/e2e/axe coverage, GitHub Actions CI, Vercel production deploy, analytics wired.

---

## Deferred / fast-follow items (not blocking any milestone)

- AI Knowledge RAG: real deploy, screenshots, repo link, evaluation metrics.
- Coderhouse / Monchis: additional safe metrics if they become available (do not invent).
- Calendly link, Education/Certifications on-site: explicitly excluded from the portfolio for now.
