# kedavema-dev

Terminal-inspired portfolio for Kevin Velázquez — backend-focused full-stack engineer. Built with Next.js (App Router), TypeScript, Tailwind, and Zod-validated typed content.

**Resuming a session? Start with `docs/MILESTONES.md`** — it tracks what's done, what's next, and any gotchas from previous work, so you don't need to re-read the whole history.

## Project docs

- `docs/MILESTONES.md` — milestone status tracker (read this first)
- `docs/content-inventory.md` — source of truth for all real content (profile, links, skills, projects, experience)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (falls back to another port if 3000 is busy).

```bash
pnpm build   # production build
pnpm lint    # eslint
```

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Zod, deployed to Vercel. See `docs/MILESTONES.md` for the full milestone plan and `docs/content-inventory.md` for content decisions.
