import type { Metadata } from "next";
import { getProfile, getExperience, getLanguages } from "@/lib/content";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `About — ${profileForMetadata.name}`,
  description: `${profileForMetadata.title} — background and experience.`,
};

export default function AboutPage() {
  const profile = getProfile();
  const experience = getExperience();
  const languages = getLanguages();

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-muted">{profile.title}</p>
        <p className="mt-4 max-w-2xl leading-relaxed">{profile.summary}</p>
        <p className="mt-2 text-sm text-muted">{profile.location}</p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-accent">Experience</h2>
        <div className="space-y-6">
          {experience.map((entry) => (
            <div key={`${entry.company}-${entry.start}`} className="border-l border-border pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="break-words font-semibold">
                  {entry.company} — {entry.role}
                </h3>
                <span className="text-sm text-muted">
                  {entry.start} – {entry.end ?? "Present"}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed">{entry.summary}</p>
              {entry.stack && (
                <p className="mt-2 text-xs text-muted">{entry.stack.join(" · ")}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-accent">Languages</h2>
        <ul className="space-y-1 text-sm">
          {languages.map((lang) => (
            <li key={lang.language}>
              <span className="font-semibold">{lang.language}:</span> {lang.level}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
