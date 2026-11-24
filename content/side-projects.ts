import { sideProjectSchema, type SideProject } from "./types";

export const sideProjects: SideProject[] = [
  {
    name: "AI Knowledge RAG",
    file: "RAG.PRJ",
    status: "In progress",
    summary:
      "A question-answering service over your own documents. Every answer cites the passages it used, and when the documents don't cover the question it says so instead of guessing. Python, FastAPI, PostgreSQL with pgvector.",
    caseStudy: "ai-knowledge-rag",
    // Add links.repo / links.live once the repo is public.
  },
].map((project) => sideProjectSchema.parse(project));
