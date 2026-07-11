import type { Metadata } from "next";
import { getLinks, getProfile } from "@/lib/content";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `Resume — ${profileForMetadata.name}`,
  description: "Download or view the resume.",
};

export default function ResumePage() {
  const profile = getProfile();
  const links = getLinks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resume</h1>
        <p className="text-muted">{profile.name} — {profile.title}</p>
      </div>
      <a
        href={links.resumeUrl}
        download
        className="inline-block rounded border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        Download resume PDF
      </a>
      <div
        className="overflow-hidden rounded border border-border"
        style={{ height: "min(80vh, 70dvh)" }}
      >
        <iframe src={links.resumeUrl} title="Resume PDF" className="h-full w-full" />
      </div>
    </div>
  );
}
