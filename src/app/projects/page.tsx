import type { Metadata } from "next";
import Link from "next/link";
import { getProfile, getProjects } from "@/lib/content";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `Projects — ${profileForMetadata.name}`,
  description: "Featured backend and full-stack projects and case studies.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="space-y-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block rounded border border-border p-4 transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="break-words font-semibold">{project.name}</h2>
              {project.employmentDates && (
                <span className="text-sm text-muted">{project.employmentDates}</span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed">{project.summary}</p>
            <p className="mt-3 break-words text-xs text-muted">{project.stack.join(" · ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
