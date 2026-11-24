import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BOOT_INIT_SCRIPT, type BootLine } from "@/components/desktop/BootScreen";
import { DesktopShell } from "@/components/desktop/DesktopShell";
import { toDesktopJobs } from "@/components/desktop/jobs";
import { getExperience, getLinks, getProfile } from "@/lib/content";
import { toDosName } from "@/lib/dosName";
import { getSiteUrl } from "@/lib/seo/site";
import "./globals.css";

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const profile = getProfile();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${profile.name} · ${profile.title}`,
  description: profile.summary,
};

function bootScreen(): { header: string[]; lines: BootLine[] } {
  const experience = getExperience();
  const now = new Date();
  const firstStart = experience.map((entry) => entry.start).sort()[0];
  const [firstYear, firstMonth] = firstStart.split("-").map(Number);
  const months = (now.getUTCFullYear() - firstYear) * 12 + (now.getUTCMonth() + 1 - firstMonth);
  const years = Math.floor(months / 12);

  return {
    header: [
      `kedavema BIOS v1.0 · built in ${profile.location.split(",")[0]}`,
      `Copyright (C) ${firstYear}-${now.getUTCFullYear()} ${profile.name}`,
    ],
    lines: [
      { label: "Main processor", value: "one backend engineer" },
      { label: "Memory test", value: "640K", ok: true },
      { label: "Experience", value: `${years} years in production`, ok: true },
      { label: "Location", value: `${profile.location} (UTC-3)`, ok: true },
      { label: "Hometown", value: `${profile.hometown}, ex Tacuaral`, ok: true },
      {
        label: "Mounting /work",
        value: experience.map((entry) => toDosName(entry.company, "x").split(".")[0].toLowerCase()).join(" "),
      },
      { label: "Loading", value: "kevin.txt work.db stack.cfg" },
      ...(profile.availability
        ? [{ label: "Status", value: profile.availability.replace(/\.$/, "").toLowerCase(), green: true }]
        : []),
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-win focus:px-3 focus:py-2 focus:text-link"
        >
          Skip to content
        </a>
        <DesktopShell
          jobs={toDesktopJobs(getExperience())}
          links={getLinks()}
          hometown={profile.hometown}
          boot={bootScreen()}
        >
          {children}
        </DesktopShell>
        <Analytics />
      </body>
    </html>
  );
}
