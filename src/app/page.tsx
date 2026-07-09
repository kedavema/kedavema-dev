import Link from "next/link";
import { getProfile } from "@/lib/content";

export default function Home() {
  const profile = getProfile();

  return (
    <div className="space-y-6">
      <p className="text-accent">
        visitor@portfolio:~$ <span className="text-foreground">whoami</span>
      </p>
      <div>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-muted">{profile.title}</p>
      </div>
      <p className="max-w-2xl leading-relaxed">{profile.summary}</p>
      <p className="text-sm text-muted">
        This is the static-routes shell (M1). The interactive terminal command line
        ships in M2 — for now, navigate with the links above.
      </p>
      <div className="flex flex-wrap gap-3 pt-2 text-sm">
        <Link href="/about" className="rounded border border-border px-3 py-1 hover:border-accent hover:text-accent">
          about
        </Link>
        <Link href="/projects" className="rounded border border-border px-3 py-1 hover:border-accent hover:text-accent">
          projects
        </Link>
        <Link href="/resume" className="rounded border border-border px-3 py-1 hover:border-accent hover:text-accent">
          resume
        </Link>
        <Link href="/contact" className="rounded border border-border px-3 py-1 hover:border-accent hover:text-accent">
          contact
        </Link>
      </div>
    </div>
  );
}
