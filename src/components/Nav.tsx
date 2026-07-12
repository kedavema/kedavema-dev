"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/resume", label: "résumé" },
  { href: "/contact", label: "contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-accent shadow-[0_0_0_1px_var(--accent-line),0_4px_16px_var(--accent-soft)]"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rotate-45 rounded-[2px] bg-bg" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-fg">
            Kevin Velázquez
          </span>
          <span className="font-mono text-xs text-faint">~/</span>
        </Link>

        <div className="flex items-center gap-5">
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap gap-5 font-mono text-sm"
          >
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded py-1 transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
