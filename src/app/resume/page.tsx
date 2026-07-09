import type { Metadata } from "next";
import { getLinks, getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume — Kevin Velázquez",
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
        className="inline-block rounded border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
      >
        Download PDF
      </a>
      <div className="overflow-hidden rounded border border-border" style={{ height: "80vh" }}>
        <iframe src={links.resumeUrl} title="Resume PDF" className="h-full w-full" />
      </div>
    </div>
  );
}
