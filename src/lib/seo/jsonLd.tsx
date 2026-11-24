import type { ExperienceEntry, Links, Profile } from "@content/types";
import { getSiteUrl } from "./site";

function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPersonJsonLd(profile: Profile, links: Links, currentJob?: ExperienceEntry) {
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: links.email,
    url: getSiteUrl(),
    sameAs: [links.github, links.linkedin],
    ...(currentJob && !currentJob.end
      ? { worksFor: { "@type": "Organization", name: currentJob.company } }
      : {}),
  });
}

export function buildWebsiteJsonLd(profile: Profile) {
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    url: getSiteUrl(),
  });
}

export function JsonLd({ json }: { json: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
