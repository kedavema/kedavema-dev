# kedavema-dev

Portfolio for Kevin Velázquez, senior backend engineer: a text-mode desktop with windows, menus and a telegraph office from Ypacaraí. Built with Next.js (App Router), TypeScript, Tailwind and Zod-validated typed content.

**Resuming a session? Start with `docs/MILESTONES.md`** — it tracks what's done, what's next, and any gotchas from previous work, so you don't need to re-read the whole history.

## Project docs

- `docs/MILESTONES.md` — milestone status tracker (read this first)
- `content/` — source of truth for all site copy (profile, experience, side projects, case studies), validated by the Zod schemas in `content/types.ts`
- `docs/content-inventory.md` — original M0 content inventory (historical; superseded by `content/` and the 2026 CV)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (falls back to another port if 3000 is busy).

```bash
pnpm build                  # production build
pnpm lint                   # eslint
pnpm test                   # unit tests (Vitest)
pnpm exec playwright test   # e2e + axe a11y checks
```

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Zod, deployed to Vercel. See `docs/MILESTONES.md` for the milestone history.
