import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = ["/", "/contact"];
  const caseStudyRoutes = getCaseStudies().map((caseStudy) => `/work/${caseStudy.slug}`);

  return [...staticRoutes, ...caseStudyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
