"use client";

import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const routePath = pathname === "/" ? "~" : `~${pathname}`;

  return (
    <div className="mb-5 font-mono text-xs text-faint">
      kevin@velazquez:<span className="text-blue">~</span>$ cd {routePath}
    </div>
  );
}
