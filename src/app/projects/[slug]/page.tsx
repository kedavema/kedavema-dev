import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getProjectBySlug, getProjects } from "@/lib/content";
import { JsonLd, buildProjectJsonLd } from "@/lib/seo/jsonLd";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Panel } from "@/components/ui/Panel";
import { CTAButton } from "@/components/ui/CTAButton";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Kevin Velázquez`,
    description: project.summary,
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3.5 font-display text-xl font-semibold">
      <span className="font-mono text-accent">## </span>
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudyBySlug(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <article>
      <JsonLd json={buildProjectJsonLd(project)} />

      <Link
        href="/projects"
        className="mb-5 inline-block font-mono text-xs text-muted transition-colors hover:text-fg"
      >
        ← back to projects
      </Link>

      {project.featured && (
        <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
          <SectionEyebrow tone="accent">★ featured project</SectionEyebrow>
          {project.roleTitle && project.employmentDates ? (
            <StatusBadge>{project.employmentDates}</StatusBadge>
          ) : (
            <StatusBadge>production · deterministic</StatusBadge>
          )}
        </div>
      )}

      <h1 className="mb-3.5 break-words font-display text-4xl font-semibold leading-none tracking-[-0.028em] sm:text-[46px]">
        {project.name}
      </h1>
      {project.roleTitle && project.employmentDates && (
        <p className="mb-2 font-mono text-sm text-muted">
          {project.roleTitle} · {project.employmentDates}
        </p>
      )}
      <p className="mb-6 max-w-[680px] text-base leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mb-8 flex flex-wrap gap-2.5">
        {project.links?.repo && (
          <CTAButton href={project.links.repo} variant="primary">
            View source ↗
          </CTAButton>
        )}
        <CTAButton href="/contact" variant="secondary">
          Discuss this project
        </CTAButton>
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <SectionHeading>overview</SectionHeading>
          <p className="mb-3.5 text-sm leading-relaxed text-muted">
            {caseStudy.approach}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            {caseStudy.architectureNotes}
          </p>
        </Panel>
        <Panel>
          <SectionEyebrow>tech stack</SectionEyebrow>
          <div className="mt-4 font-mono text-xs text-muted">
            {project.stack.join(" · ")}
          </div>
        </Panel>
      </div>

      {caseStudy.pipeline && (
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.pipeline.map((step) => (
            <Panel key={step.step}>
              <div className="mb-2.5 font-mono text-xs font-semibold text-accent">
                {step.step}
              </div>
              <div className="mb-1.5 font-display text-[15px] font-semibold">
                {step.title}
              </div>
              <p className="text-[12.5px] leading-relaxed text-muted">
                {step.body}
              </p>
            </Panel>
          ))}
        </div>
      )}

      {caseStudy.highlights && (
        <div className="mb-4 rounded-2xl border border-accent-line bg-gradient-to-br from-accent-soft to-transparent p-7">
          <SectionHeading>engineering highlights</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {caseStudy.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-0.5 text-accent" aria-hidden="true">
                  ▹
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <SectionHeading>problem</SectionHeading>
          <p className="text-sm leading-relaxed text-muted">{caseStudy.problem}</p>
        </Panel>
        <Panel>
          <SectionHeading>tradeoffs</SectionHeading>
          <p className="text-sm leading-relaxed text-muted">{caseStudy.tradeoffs}</p>
        </Panel>
        {caseStudy.relevantWork && (
          <Panel>
            <SectionHeading>relevant work</SectionHeading>
            <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
              {caseStudy.relevantWork.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        )}
        <Panel>
          <SectionHeading>outcome</SectionHeading>
          <p className="text-sm leading-relaxed text-muted">{caseStudy.outcome}</p>
        </Panel>
      </div>
    </article>
  );
}
