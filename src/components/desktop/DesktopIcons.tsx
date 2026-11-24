"use client";

import type { Links } from "@content/types";
import { useDesktop } from "./DesktopContext";

const iconProps = {
  width: 44,
  height: 44,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "var(--ink)",
  strokeWidth: 1.4,
  shapeRendering: "crispEdges",
  "aria-hidden": true,
} as const;

export function DesktopIcons({ links }: { links: Links }) {
  const { openDialog } = useDesktop();

  return (
    <nav
      aria-label="Desktop"
      className="order-last flex flex-[1_1_96px] flex-wrap content-start gap-x-5 gap-y-2 md:order-first"
    >
      <a className="desk-icon" href={links.resumeUrl}>
        <svg {...iconProps}>
          <path d="M4 2h8l4 4v12H4z" />
          <path d="M12 2v4h4" />
          <path d="M7 10h6M7 13h6" />
        </svg>
        <span className="desk-icon-label">RESUME.PDF</span>
      </a>
      <a className="desk-icon" href={links.github}>
        <svg {...iconProps}>
          <path d="M2 5h6l2 2h8v10H2z" />
        </svg>
        <span className="desk-icon-label">GITHUB</span>
      </a>
      <a className="desk-icon" href={links.linkedin}>
        <svg {...iconProps}>
          <rect x="2" y="4" width="16" height="12" />
          <rect x="5" y="7" width="4" height="4" />
          <path d="M11 8h5M11 11h5M5 13.5h4" />
        </svg>
        <span className="desk-icon-label">LINKEDIN</span>
      </a>
      <button type="button" className="desk-icon" aria-haspopup="dialog" onClick={() => openDialog("telegram")}>
        <svg {...iconProps}>
          <path d="M3 16V8l7-5 7 5v8z" />
          <path d="M3 16h14" />
          <path d="M7 16v-5h6v5" />
          <path d="M10 3V1M8 1h4" />
        </svg>
        <span className="desk-icon-label">TELEGRAM</span>
      </button>
    </nav>
  );
}
