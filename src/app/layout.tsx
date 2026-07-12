import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/Nav";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getProfile } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

const profile = getProfile();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="relative flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:border focus:border-accent focus:bg-background focus:px-3 focus:py-2 focus:text-accent"
        >
          Skip to content
        </a>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-[size:36px_36px] [background-image:linear-gradient(var(--grid,transparent)_1px,transparent_1px),linear-gradient(90deg,var(--grid,transparent)_1px,transparent_1px)] [mask-image:radial-gradient(150%_100%_at_25%_-5%,#000,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -left-32 -top-52 z-0 h-[460px] w-[760px] bg-[radial-gradient(50%_50%_at_50%_50%,var(--glow,transparent),transparent_70%)]"
        />
        <Nav />
        <main
          id="main-content"
          className="relative z-[1] mx-auto w-full max-w-[1180px] flex-1 px-4 py-10 sm:px-7"
        >
          <Breadcrumb />
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
