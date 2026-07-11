import Link from "next/link";
import { getLinks, getProfile } from "@/lib/content";
import { TerminalShell } from "@/components/terminal/TerminalShell";
import { JsonLd, buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo/jsonLd";

export default function Home() {
  const profile = getProfile();
  const links = getLinks();

  return (
    <div className="space-y-6">
      <JsonLd json={buildPersonJsonLd(profile, links)} />
      <JsonLd json={buildWebsiteJsonLd(profile)} />
      <div>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-muted">{profile.title}</p>
      </div>
      <p className="max-w-2xl leading-relaxed">{profile.summary}</p>
      <TerminalShell />
      <div className="flex flex-wrap gap-3 pt-2 text-sm">
        <Link
          href="/about"
          className="rounded border border-border px-3 py-1.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          about
        </Link>
        <Link
          href="/projects"
          className="rounded border border-border px-3 py-1.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          projects
        </Link>
        <Link
          href="/resume"
          className="rounded border border-border px-3 py-1.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          resume
        </Link>
        <Link
          href="/contact"
          className="rounded border border-border px-3 py-1.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          contact
        </Link>
      </div>
    </div>
  );
}
