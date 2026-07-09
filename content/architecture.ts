import { architectureSchema, type Architecture } from "./types";

export const architecture: Architecture = architectureSchema.parse({
  summary:
    "This portfolio isn't a featured project — it's the subject of this command. The site demonstrates backend-oriented thinking through its own internal architecture, not just its visual design.",
  notes: [
    {
      heading: "Curated command set, not a shell emulator",
      body: "The terminal uses a small command registry instead of emulating a real shell. It's recruiter-friendly navigation, not a sandbox to escape.",
    },
    {
      heading: "Typed local content layer",
      body: "Content lives in local TypeScript files validated with Zod schemas, accessed only through a repository-style abstraction (src/lib/content.ts). UI components never import raw content files directly.",
    },
    {
      heading: "Static routes independent from the terminal",
      body: "Routes like /, /about, /projects, /projects/[slug], /resume, and /contact exist independently of the terminal UI, keeping SEO and accessibility unaffected by the terminal experience.",
    },
    {
      heading: "Small backend slice for contact (planned)",
      body: "A future contact flow will use a Next.js Route Handler or Server Action with Resend, honeypot spam protection, and graceful fallback to direct email/LinkedIn/GitHub links — without overengineering a full backend.",
    },
    {
      heading: "Room to grow",
      body: "The typed content layer can evolve later into API-backed content or richer case studies without changing how the terminal or static pages consume it.",
    },
  ],
});
