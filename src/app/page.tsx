import {
  getCaseStudyBySlug,
  getExperience,
  getLinks,
  getProfile,
  getProjectBySlug,
  getSkillGroups,
} from "@/lib/content";
import { JsonLd, buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo/jsonLd";
import { CTAButton } from "@/components/ui/CTAButton";
import { Panel } from "@/components/ui/Panel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Chip } from "@/components/ui/Chip";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

const FEATURED_PROJECT_SLUG = "ai-knowledge-rag";

export default function Home() {
  const profile = getProfile();
  const links = getLinks();
  const experience = getExperience();
  const skillGroups = getSkillGroups();
  const featuredProject = getProjectBySlug(FEATURED_PROJECT_SLUG);
  const featuredCaseStudy = getCaseStudyBySlug(FEATURED_PROJECT_SLUG);

  return (
    <div>
      <JsonLd json={buildPersonJsonLd(profile, links)} />
      <JsonLd json={buildWebsiteJsonLd(profile)} />

      {/* Hero + status */}
      <div className="grid gap-4 lg:grid-cols-[1.62fr_1fr]">
        <div className="rounded-2xl border border-border bg-[image:var(--elevate)] p-8 shadow-[var(--shadow)] sm:p-10">
          <SectionEyebrow tone="accent" className="mb-4">
            {`// ${profile.title.toLowerCase()}`}
          </SectionEyebrow>
          <h1 className="mb-4 font-display text-4xl font-semibold leading-none tracking-[-0.028em] sm:text-5xl">
            I build production
            <br />
            systems end-to-end.
          </h1>
          <p className="mb-6 max-w-[560px] text-[15.5px] leading-relaxed text-muted">
            Backend architecture, cloud infrastructure, and AI-powered
            features — shipped and owned in production. 4+ years across
            TypeScript, Python, Node.js, PostgreSQL and AWS.
          </p>
          <div className="mb-7 flex flex-wrap items-center gap-2.5">
            <CTAButton href="/projects" variant="primary">
              View projects →
            </CTAButton>
            <CTAButton href="/resume" variant="secondary">
              View résumé
            </CTAButton>
            <a
              href={links.github}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3.5 py-2.5 font-mono text-[13px] font-medium text-muted transition-colors hover:border-accent-line hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              GitHub ↗
            </a>
            <a
              href={links.linkedin}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3.5 py-2.5 font-mono text-[13px] font-medium text-muted transition-colors hover:border-accent-line hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              LinkedIn ↗
            </a>
          </div>
          <div className="border-t border-border pt-4 font-mono text-[13px] leading-[1.7]">
            <div className="text-faint">
              <span className="text-green">visitor@portfolio</span>:
              <span className="text-blue">~</span>$ whoami
            </div>
            <div className="text-fg">
              kevin — backend engineer · 4+ yrs · remote-ready
              <span
                className="ml-1 inline-block h-[15px] w-2 translate-y-[2px] bg-accent motion-safe:animate-[blink_1.1s_step-end_infinite]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-border bg-panel-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <SectionEyebrow>system status</SectionEyebrow>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-green">
              <span
                className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_var(--green)] motion-safe:animate-[pulseDot_2s_ease-in-out_infinite]"
                aria-hidden="true"
              />
              operational
            </span>
          </div>
          <div className="font-mono text-[13px]">
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-faint">availability</span>
              <span className="text-green">open · remote</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-faint">location</span>
              <span>{profile.location}</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-faint">experience</span>
              <span>4+ yrs · production</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-faint">focus</span>
              <span>backend architecture</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-faint">languages</span>
              <span>ES native · EN B2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <svg
          width="150"
          height="24"
          viewBox="0 0 150 24"
          fill="none"
          className="shrink-0"
          aria-hidden="true"
        >
          <line x1="8" y1="12" x2="50" y2="12" stroke="var(--accent-line)" strokeWidth="1" />
          <line x1="50" y1="12" x2="92" y2="5" stroke="var(--accent-line)" strokeWidth="1" />
          <line x1="50" y1="12" x2="92" y2="19" stroke="var(--accent-line)" strokeWidth="1" />
          <line x1="92" y1="5" x2="140" y2="12" stroke="var(--accent-line)" strokeWidth="1" />
          <line x1="92" y1="19" x2="140" y2="12" stroke="var(--accent-line)" strokeWidth="1" />
          <circle cx="8" cy="12" r="3.5" fill="var(--accent)" />
          <circle cx="50" cy="12" r="3.5" fill="var(--accent)" />
          <circle cx="92" cy="5" r="3" fill="var(--muted)" />
          <circle cx="92" cy="19" r="3" fill="var(--muted)" />
          <circle cx="140" cy="12" r="3.5" fill="var(--accent)" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
          featured work
        </span>
      </div>

      {/* Featured spotlight */}
      {featuredProject && featuredCaseStudy && (
        <div className="mb-4 rounded-2xl border border-accent-line bg-gradient-to-br from-accent-soft to-transparent p-7 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center">
            <div>
              <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
                <SectionEyebrow tone="accent">★ featured project</SectionEyebrow>
                <StatusBadge>production · deterministic</StatusBadge>
              </div>
              <h2 className="mb-2.5 font-display text-2xl font-semibold tracking-[-0.02em]">
                {featuredProject.name}
              </h2>
              <p className="mb-4 max-w-[560px] text-sm leading-relaxed text-muted">
                {featuredProject.summary}
              </p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {featuredProject.stack.slice(0, 7).map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
              <CTAButton href={`/projects/${featuredProject.slug}`} variant="ghost">
                View case study →
              </CTAButton>
            </div>
            <TerminalWindow title="query.grounded">
              <div className="mb-2 text-faint">› retrieval: 4 chunks matched</div>
              <div className="mb-2.5 text-fg">
                Answer grounded in source docs.{" "}
                <span className="text-accent">[1] [2] [4]</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-green/30 bg-green/10 px-2.5 py-2 text-[11px] text-green">
                <span aria-hidden="true">✓</span>
                citations verified · refusal on low context
              </div>
            </TerminalWindow>
          </div>
        </div>
      )}

      {/* Stack matrix + deploy log */}
      <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr]">
        <Panel className="p-6">
          <SectionEyebrow className="mb-4">stack matrix</SectionEyebrow>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <div className="mb-2 font-mono text-xs font-semibold text-accent">
                  {group.category.toLowerCase()}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.slice(0, 4).map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <SectionEyebrow className="mb-4">deploy log — experience</SectionEyebrow>
          <Timeline>
            {experience.map((entry) => (
              <TimelineItem key={`${entry.company}-${entry.start}`}>
                <div className="flex items-baseline justify-between gap-2.5">
                  <span className="font-display text-sm font-semibold">
                    {entry.role}
                  </span>
                  <span className="whitespace-nowrap font-mono text-[11px] text-faint">
                    {entry.start} – {entry.end ?? "Present"}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {entry.summary}
                </p>
              </TimelineItem>
            ))}
          </Timeline>
        </Panel>
      </div>
    </div>
  );
}
