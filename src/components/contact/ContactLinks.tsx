import type { Links } from "@content/types";

export function ContactLinks({ links }: { links: Links }) {
  return (
    <ul className="m-0 grid list-none grid-cols-[minmax(0,9ch)_minmax(0,1fr)] gap-x-[1ch] gap-y-1 p-0">
      <li className="contents">
        <span className="text-dim">Email</span>
        <a className="link break-words" href={`mailto:${links.email}`}>
          {links.email}
        </a>
      </li>
      <li className="contents">
        <span className="text-dim">GitHub</span>
        <a className="link break-all" href={links.github}>
          {links.github.replace(/^https:\/\//, "")}
        </a>
      </li>
      <li className="contents">
        <span className="text-dim">LinkedIn</span>
        <a className="link break-all" href={links.linkedin}>
          {links.linkedin.replace(/^https:\/\/(www\.)?/, "")}
        </a>
      </li>
    </ul>
  );
}
