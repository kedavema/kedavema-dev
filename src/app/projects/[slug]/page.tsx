import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getProjectBySlug, getProjects } from "@/lib/content";

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
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        {project.roleTitle && project.employmentDates && (
          <p className="text-muted">
            {project.roleTitle} · {project.employmentDates}
          </p>
        )}
        <p className="mt-4 max-w-2xl leading-relaxed">{project.summary}</p>
        <p className="mt-3 text-xs text-muted">{project.stack.join(" · ")}</p>
      </header>

      <section>
        <h2 className="mb-1 text-sm font-semibold text-accent">Problem</h2>
        <p className="leading-relaxed">{caseStudy.problem}</p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold text-accent">Approach</h2>
        <p className="leading-relaxed">{caseStudy.approach}</p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold text-accent">Architecture notes</h2>
        <p className="leading-relaxed">{caseStudy.architectureNotes}</p>
      </section>

      {caseStudy.relevantWork && (
        <section>
          <h2 className="mb-1 text-sm font-semibold text-accent">Relevant work</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed">
            {caseStudy.relevantWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-1 text-sm font-semibold text-accent">Tradeoffs</h2>
        <p className="leading-relaxed">{caseStudy.tradeoffs}</p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold text-accent">Outcome</h2>
        <p className="leading-relaxed">{caseStudy.outcome}</p>
      </section>
    </article>
  );
}
