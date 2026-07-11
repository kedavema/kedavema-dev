import type { Links, Profile, Project } from "@content/types";
import { getSiteUrl } from "./site";

function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPersonJsonLd(profile: Profile, links: Links) {
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: links.email,
    url: getSiteUrl(),
    sameAs: [links.github, links.linkedin],
  });
}

export function buildWebsiteJsonLd(profile: Profile) {
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: getSiteUrl(),
  });
}

export function buildProjectJsonLd(project: Project) {
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    programmingLanguage: project.stack,
    url: `${getSiteUrl()}/projects/${project.slug}`,
    ...(project.links?.repo ? { codeRepository: project.links.repo } : {}),
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
