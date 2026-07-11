import Link from "next/link";

const links = [
  { href: "/", label: "~" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-4 px-4 py-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-label={link.label === "~" ? "Home" : undefined}
            className="rounded text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
