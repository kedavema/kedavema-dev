import type { Metadata } from "next";
import { getLinks, getProfile } from "@/lib/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactLinks } from "@/components/contact/ContactLinks";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `Contact — ${profileForMetadata.name}`,
  description: "Get in touch.",
};

export default function ContactPage() {
  const links = getLinks();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="mt-2 text-muted">
          Send a message directly, or reach out through one of the links below.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <ContactForm links={links} />
        <div>
          <h2 className="mb-3 text-sm font-semibold text-accent">Direct links</h2>
          <ContactLinks links={links} />
        </div>
      </div>
    </div>
  );
}
