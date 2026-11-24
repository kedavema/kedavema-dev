import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // Keep links to the old routes working after the redesign.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/resume", destination: "/resume.pdf", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      {
        source: "/projects/ai-knowledge-rag",
        destination: "/work/ai-knowledge-rag",
        permanent: true,
      },
      { source: "/projects/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
