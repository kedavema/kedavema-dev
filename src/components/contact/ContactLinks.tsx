import type { Links } from "@content/types";

export function ContactLinks({ links }: { links: Links }) {
  return (
    <ul className="space-y-2 text-sm">
      <li className="break-words">
        <span className="text-muted">Email:</span>{" "}
        <a
          href={`mailto:${links.email}`}
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {links.email}
        </a>
      </li>
      <li className="break-all">
        <span className="text-muted">GitHub:</span>{" "}
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {links.github}
        </a>
      </li>
      <li className="break-all">
        <span className="text-muted">LinkedIn:</span>{" "}
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {links.linkedin}
        </a>
      </li>
    </ul>
  );
}
