import type { Metadata } from "next";
import { getLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Kevin Velázquez",
  description: "Get in touch.",
};

export default function ContactPage() {
  const links = getLinks();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-muted">
        Direct links for now — the contact form (Route Handler + validation + email
        delivery) ships in M4.
      </p>
      <ul className="space-y-2 text-sm">
        <li>
          <span className="text-muted">Email:</span>{" "}
          <a href={`mailto:${links.email}`} className="hover:text-accent">
            {links.email}
          </a>
        </li>
        <li>
          <span className="text-muted">GitHub:</span>{" "}
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            {links.github}
          </a>
        </li>
        <li>
          <span className="text-muted">LinkedIn:</span>{" "}
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            {links.linkedin}
          </a>
        </li>
      </ul>
    </div>
  );
}
