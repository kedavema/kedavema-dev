import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = ["/", "/about", "/projects", "/resume", "/contact"];
  const projectRoutes = getProjects().map((project) => `/projects/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
