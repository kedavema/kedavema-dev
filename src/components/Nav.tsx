"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KLogo } from "@/components/KLogo";
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
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-2 px-3 py-3 md:gap-4 md:px-7 md:py-3.5">
        <div className="flex shrink-0 items-center gap-2.5">
          <KLogo />
          <span className="hidden font-display text-[15px] font-semibold tracking-[-0.01em] text-fg md:inline">
            Kevin Velázquez
          </span>
          <span className="hidden font-mono text-xs text-faint md:inline">
            ~/
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2 md:gap-5">
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-2 font-mono text-xs whitespace-nowrap md:gap-5 md:text-sm"
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
                    link.href === "/" && "hidden md:inline",
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
