import type { Metadata } from "next";
import {
  getExperience,
  getLanguages,
  getLinks,
  getProfile,
  getSkillGroups,
} from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Panel } from "@/components/ui/Panel";
import { CTAButton } from "@/components/ui/CTAButton";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `Resume — ${profileForMetadata.name}`,
  description: "Download or view the resume.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-lg font-semibold">
      <span className="font-mono text-accent">## </span>
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const profile = getProfile();
  const links = getLinks();
  const experience = getExperience();
  const skillGroups = getSkillGroups();
  const languages = getLanguages();

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <SectionEyebrow tone="accent" className="mb-3">
            ## résumé
          </SectionEyebrow>
          <h1 className="mb-2 font-display text-4xl font-semibold tracking-[-0.028em] sm:text-[44px]">
            {profile.name}
          </h1>
          <p className="font-mono text-sm text-muted">
            {profile.title} · {profile.location} ·{" "}
            <a href={`mailto:${profile.email}`} className="text-accent">
              {profile.email}
            </a>
          </p>
        </div>
        <CTAButton href={links.resumeUrl} download variant="primary">
          ↓ Download PDF
        </CTAButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <SectionHeading>experience</SectionHeading>
          <div className="mt-1">
            {experience.map((entry) => (
              <div
                key={`${entry.company}-${entry.start}`}
                className="border-b border-border py-4 last:border-b-0 last:pb-0"
              >
                <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-display text-[15px] font-semibold">
                    {entry.company}{" "}
                    <span className="font-sans font-normal text-faint">
                      — {entry.role}
                    </span>
                  </span>
                  <span className="whitespace-nowrap font-mono text-[11px] text-faint">
                    {entry.start} – {entry.end ?? "Present"}
                  </span>
                </div>
                <p className="mb-2 text-[13px] leading-relaxed text-muted">
                  {entry.summary}
                </p>
                {entry.stack && (
                  <div className="font-mono text-[11px] leading-relaxed text-faint">
                    {entry.stack.join(" · ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel>
            <SectionHeading>skills</SectionHeading>
            <div className="mt-4 flex flex-col gap-3.5 font-mono text-xs">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <div className="mb-1 text-accent">
                    {group.category.toLowerCase()}
                  </div>
                  <div className="leading-relaxed text-muted">
                    {group.items.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeading>languages</SectionHeading>
            <div className="mt-3.5 flex flex-col gap-2.5 font-mono text-xs">
              {languages.map((lang) => (
                <div key={lang.language}>
                  <div className="mb-1 text-accent">
                    {lang.language.toLowerCase()}
                  </div>
                  <div className="text-muted">{lang.level}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
