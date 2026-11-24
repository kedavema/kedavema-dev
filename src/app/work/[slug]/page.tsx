import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OpenDialogButton } from "@/components/desktop/OpenDialogButton";
import { Window } from "@/components/desktop/Window";
import { getCaseStudies, getCaseStudyBySlug, getLinks, getProfile } from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} · ${getProfile().name}`,
    description: caseStudy.lead,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();
  const links = getLinks();

  return (
    <div className="mx-auto max-w-[920px]">
      <Window title={caseStudy.file} badge="1" active titleId="w-case">
        <article className="flex flex-col gap-6">
          <Link href="/#work-db" className="link w-fit">
            ◄ Back to the desktop
          </Link>

          <header className="flex flex-col gap-3.5">
            <p className="m-0 text-dim">{caseStudy.kicker}</p>
            <h1 className="m-0 text-[clamp(40px,6vw,64px)] font-normal leading-[0.95]">{caseStudy.title}</h1>
            <p className="m-0 max-w-[50ch] text-[26px] leading-[1.2]">{caseStudy.lead}</p>
          </header>

          <dl className="m-0 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-3.5">
            {caseStudy.glance.map((item) => (
              <div key={item.label} className="grid min-w-0 gap-0.5">
                <dt className="text-dim">{item.label}</dt>
                <dd className="m-0 text-link">{item.value}</dd>
              </div>
            ))}
          </dl>

          {caseStudy.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="m-0 text-[30px] font-normal leading-[1.1] text-accent">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="m-0 max-w-[62ch]">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="m-0 flex max-w-[62ch] list-none flex-col gap-1.5 p-0">
                  {section.items.map((item) => (
                    <li key={item} className="grid grid-cols-[2ch_minmax(0,1fr)]">
                      <span aria-hidden="true" className="text-link">
                        ■
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {(caseStudy.links?.repo || caseStudy.links?.live) && (
            <div className="flex flex-wrap gap-x-[26px] gap-y-[22px]">
              {caseStudy.links.repo && (
                <a className="dos dos-hot" href={caseStudy.links.repo}>
                  &lt; Source on GitHub &gt;
                </a>
              )}
              {caseStudy.links.live && (
                <a className="dos" href={caseStudy.links.live}>
                  &lt; Live demo &gt;
                </a>
              )}
            </div>
          )}

          <p className="m-0 border-t border-line pt-5 text-dim">
            Questions about this work?{" "}
            <OpenDialogButton kind="telegram" className="link cursor-pointer border-0 bg-transparent p-0 font-[inherit]">
              Send a telegram
            </OpenDialogButton>{" "}
            or write to{" "}
            <a className="link" href={`mailto:${links.email}`}>
              {links.email}
            </a>
            .
          </p>
        </article>
      </Window>
    </div>
  );
}
