import type { Metadata } from "next";
import { getProfile, getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `Projects — ${profileForMetadata.name}`,
  description: "Featured backend and full-stack projects and case studies.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="mb-2.5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.028em] sm:text-[44px]">
        Selected work
      </h1>
      <p className="mb-9 max-w-[600px] text-[15px] leading-relaxed text-muted">
        Production systems and the engineering decisions behind them.
      </p>
      <div className="flex flex-col gap-3.5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            index={index + 1}
            project={project}
            statusLabel={project.type === "professional" ? "production" : "in development"}
            statusTone={project.type === "professional" ? "green" : "accent"}
          />
        ))}
      </div>
    </div>
  );
}
