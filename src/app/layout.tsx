import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { getProfile } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:border focus:border-accent focus:bg-background focus:px-3 focus:py-2 focus:text-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main
          id="main-content"
          className="mx-auto w-full max-w-3xl flex-1 px-4 py-8"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
