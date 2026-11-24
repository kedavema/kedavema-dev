import Link from "next/link";
import { DesktopIcons } from "@/components/desktop/DesktopIcons";
import { OpenDialogButton } from "@/components/desktop/OpenDialogButton";
import { Window } from "@/components/desktop/Window";
import { WorkDb } from "@/components/desktop/WorkDb";
import { toDesktopJobs } from "@/components/desktop/jobs";
import { getExperience, getLinks, getProfile, getSideProjects, getStack } from "@/lib/content";
import { JsonLd, buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo/jsonLd";

export default function Home() {
  const profile = getProfile();
  const links = getLinks();
  const experience = getExperience();
  const stack = getStack();
  const sideProjects = getSideProjects();
  const [firstName, ...lastNames] = profile.name.split(" ");
  const before = experience
    .filter((entry) => entry.end)
    .slice(0, 3)
    .map((entry) => entry.company)
    .join(", ");
  const jobs = toDesktopJobs(experience);

  return (
    <>
      <JsonLd json={buildPersonJsonLd(profile, links, experience[0])} />
      <JsonLd json={buildWebsiteJsonLd(profile)} />

      <div className="flex flex-wrap items-start gap-x-10 gap-y-8">
        <DesktopIcons links={links} />

        <div className="flex min-w-0 flex-[999_1_820px] flex-wrap items-start gap-x-10 gap-y-9">
          <Window title="KEVIN.TXT" badge="1" active titleId="w-kevin" className="flex-[999_1_520px]">
            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-2.5">
                <h1 className="m-0 text-[clamp(52px,7vw,84px)] font-normal leading-[0.86] tracking-[0.5px]">
                  {firstName}
                  <br />
                  {lastNames.join(" ")}
                </h1>
                <p className="m-0 text-accent">
                  {profile.title} · from {profile.hometown}, based in {profile.location.split(",")[0]}
                </p>
              </div>
              <p className="m-0 max-w-[48ch] text-[26px] leading-[1.2]">{profile.lead}</p>
              <dl className="m-0 grid max-w-[62ch] grid-cols-[minmax(0,8ch)_minmax(0,1fr)] gap-x-[1ch] gap-y-1.5">
                <dt className="text-dim">Now</dt>
                <dd className="m-0">{profile.now}</dd>
                <dt className="text-dim">Before</dt>
                <dd className="m-0">{before}.</dd>
                {profile.availability && (
                  <>
                    <dt className="text-dim">Status</dt>
                    <dd className="m-0">
                      <span aria-hidden="true" className="text-ok">
                        ●{" "}
                      </span>
                      {profile.availability}
                    </dd>
                  </>
                )}
              </dl>
              <div className="flex flex-wrap gap-x-[26px] gap-y-[22px] pt-2">
                <a className="dos dos-hot" href="#work-db">
                  &lt; <u>W</u>ork &gt;
                </a>
                <a className="dos" href={links.resumeUrl}>
                  &lt; Résumé &gt;
                </a>
                <OpenDialogButton kind="telegram" className="dos">
                  &lt; <u>T</u>elegram me &gt;
                </OpenDialogButton>
              </div>
            </div>
          </Window>

          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-9">
            <Window
              id="work-db"
              title="WORK.DB"
              badge="2"
              titleId="w-work"
              delay={90}
              bodyClassName="px-3.5 pb-4 pt-3.5"
            >
              <WorkDb jobs={jobs} />
            </Window>

            <Window title="STACK.CFG" badge="3" titleId="w-stack" delay={180} bodyClassName="px-6 pb-5 pt-4">
              <dl className="m-0 grid grid-cols-[minmax(0,11ch)_minmax(0,1fr)] gap-x-[1ch] gap-y-1">
                {stack.map((group) => (
                  <div key={group.key} className="contents">
                    <dt className="text-link">[{group.key}]</dt>
                    <dd className="m-0">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </Window>

            {sideProjects.map((project, index) => (
              <Window
                key={project.name}
                title={project.file}
                badge={String(4 + index)}
                titleId={`w-project-${index}`}
                delay={270}
                bodyClassName="px-6 pb-[22px] pt-4"
              >
                <div className="flex flex-col gap-2">
                  <p className="m-0">
                    {project.name} <span className="text-dim">· side project, {project.status.toLowerCase()}</span>
                  </p>
                  <p className="m-0">{project.summary}</p>
                  <div className="flex flex-wrap gap-x-5">
                    {project.caseStudy && (
                      <Link className="link w-fit" href={`/work/${project.caseStudy}`}>
                        How it works ►
                      </Link>
                    )}
                    {project.links?.repo && (
                      <a className="link" href={project.links.repo}>
                        Source ►
                      </a>
                    )}
                    {project.links?.live && (
                      <a className="link" href={project.links.live}>
                        Live demo ►
                      </a>
                    )}
                  </div>
                </div>
              </Window>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
