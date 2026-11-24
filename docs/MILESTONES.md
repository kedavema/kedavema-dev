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
- `getSiteUrl()` (`src/lib/seo/site.ts`) always returns the canonical production URL `https://iamkev.vercel.app` so metadata and sitemap generation cannot drift to a deployment URL or localhost.
- Verified: `pnpm lint` and `pnpm build` clean; sitemap.xml and JSON-LD manually checked against a production build.

## M6 — Testing & Deploy ✅ done

- Unit/component tests (Vitest + Testing Library): `src/lib/content.test.ts`, `src/lib/terminal/{parser,commands}.test.ts`, `src/lib/contact/schema.test.ts`, `src/components/terminal/{CommandLine,TerminalShell}.test.tsx`, `src/components/contact/ContactForm.test.tsx`. 50 tests, `pnpm test`.
- E2E (Playwright, `e2e/`): static route navigation, full terminal flow (`help → skills → projects → case-study → contact`), contact form submit with `/api/contact` network-mocked (no real Resend calls). `playwright.config.ts` builds+starts a prod server on a configurable `PORT`.
- Automated a11y (`@axe-core/playwright`, `e2e/accessibility.spec.ts`): zero violations on every static route + the terminal's initial state.
- GitHub Actions (`.github/workflows/ci.yml`): lint → build → unit tests → Playwright e2e on push/PR to `main`.
- Vercel Analytics (`@vercel/analytics`) wired into `layout.tsx` — chosen over Plausible (zero extra config on Vercel, no cookie banner needed).
- Deployed to Vercel production: `kedavemas-projects/mi-pagina`, GitHub repo connected for autodeploy on push to `main`. Live and canonical URL: `https://iamkev.vercel.app`.
- Verified: `pnpm lint`, `pnpm build`, `pnpm test`, and `pnpm exec playwright test` all clean.

## M7 — kedavema desktop redesign (Nov 2026) 🚧 in review

Goal: stop looking AI-generated. The site is now a text-mode desktop (windows, menus, dialogs) with copy rewritten from the 2026 CV. Inspired by retro TUIs, with its own palette and details from Ypacaraí (guitar wallpaper, Tacuaral telegraph).

- Look: VT323 everywhere, dark green desktop, cream menu and status bars, orange title bar on the active window, solid block shadows. One theme only (no light mode).
- Desktop (`src/components/desktop/`): `DesktopShell` (state, keyboard shortcuts) wraps every page with `MenuBar` (File/Work/Links/Help dropdowns + live Asunción clock), `StatusBar`, `Wallpaper` (guitar for Ypacaraí), `Dialogs` and `BootScreen`. Windows are `Window` (static) and `DialogWindow` (native `<dialog>`: focus, Esc, inert background).
- Home: KEVIN.TXT, WORK.DB (rows open each job's window), STACK.CFG, RAG.PRJ, desktop icons. Case studies render as a window at `/work/[slug]`; `/contact` is the telegram window; 404 is "File not found".
- Telegram (`TelegramForm`): the contact form, posting to `/api/contact` with subject "Telegram from <name>". Shows the message in Morse after sending.
- Boot screen: once per session, skipped for reduced motion and automated browsers (`navigator.webdriver`); any key skips it.
- Shortcuts: W work menu, D résumé, T telegram, H help, Alt-X exit, Esc close.
- Routes: `/`, `/work/[slug]`, `/contact`. Old `/about`, `/projects`, `/projects/[slug]`, `/resume` redirect (`next.config.ts`). Résumé is `public/resume.pdf` (2026 CV).
- Dropped during review: a LAKE.EXE easter egg playing a guarania. The real "Recuerdo de Ypacaraí" melody is still under copyright, so it was removed rather than shipped with a substitute.
- Removed: terminal shell and commands, editorial components, theme toggle, architecture/principles/skills content, Next starter SVGs.
- Tests: unit (content integrity, period, Morse, Asunción clock, 8.3 names, TelegramForm) and e2e (navigation, job windows, redirects, 404, telegram, shortcuts, boot screen, axe on every route and with windows open).

Open items:
- Mango case study: Result section with real numbers; confirm with Mango what can be public.
- AI Knowledge RAG: add `links.repo` / `links.live` once public.
- Custom domain instead of `iamkev.vercel.app` (update `src/lib/seo/site.ts` and its test).

## M8 — Portrait and telegram email (Nov 2026) 🚧 in review

- Portrait in KEVIN.TXT: `public/kevin.png`, 160×160, Atkinson-dithered to two colours (#0b0f0e / #e9e4d6), shown with `image-rendering: pixelated`. Made from the original photo with a Playwright/canvas script (crop to the face, contrast 1.7, brightness +0.2); only the dithered file is in the repo. Configured in `content/profile.ts` (`photo`).
- Telegram email (`src/lib/contact/telegramEmail.ts`): HTML telegram (inline styles, tables) plus plain text, subject "Telegram from <name>: <first 50 chars>", received time in Asunción, sender shown as "kedavema.dev telegraph" when `CONTACT_FROM_EMAIL` is a bare address. Visitor input is HTML-escaped. Reply-to stays the visitor.
- Still sent from `onboarding@resend.dev`: a custom sender (and an auto-reply to visitors) needs a domain verified in Resend, which `*.vercel.app` can't be.

---

## Deferred / fast-follow items (not blocking any milestone)

- AI Knowledge RAG: real deploy, screenshots, repo link, evaluation metrics.
- Coderhouse / Monchis: additional safe metrics if they become available (do not invent). The old "up to 40%" Monchis figure is no longer claimed.
- Calendly link, Education/Certifications on-site: explicitly excluded from the portfolio for now.
