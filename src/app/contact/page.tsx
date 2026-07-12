import type { Metadata } from "next";
import { getLinks, getProfile } from "@/lib/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `Contact — ${profileForMetadata.name}`,
  description: "Get in touch.",
};

export default function ContactPage() {
  const links = getLinks();

  return (
    <div>
      <div className="mb-10">
        <SectionEyebrow tone="accent" className="mb-3.5">
          ## contact
        </SectionEyebrow>
        <h1 className="mb-4 font-display text-4xl font-semibold leading-none tracking-[-0.028em] sm:text-[46px]">
          Let&apos;s build
          <br />
          something solid.
        </h1>
        <p className="max-w-[520px] text-base leading-relaxed text-muted">
          Open to remote backend-focused full-stack roles with product teams.
          Send a message directly, or reach out through one of the links
          below.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-panel-2 p-6 sm:p-7">
          <ContactForm links={links} />
        </div>

        <div className="flex flex-col gap-6">
          <TerminalWindow title="contact — bash" variant="traffic-lights">
            <div className="mb-1 text-faint">
              <span className="text-green">kevin@velazquez</span>:
              <span className="text-blue">~</span>$ cat availability.txt
            </div>
            <div className="mb-3 text-fg">status: open to remote roles</div>
            <div className="mb-1 text-faint">
              <span className="text-green">kevin@velazquez</span>:
              <span className="text-blue">~</span>$ cat timezone.txt
            </div>
            <div className="mb-3 text-fg">
              Paraguay · GMT-3 · flexible overlap
            </div>
            <div className="mb-1 text-faint">
              <span className="text-green">kevin@velazquez</span>:
              <span className="text-blue">~</span>$ echo $CONTACT
            </div>
            <div className="text-accent">{links.email}</div>
            <div className="mt-3 text-faint">
              <span className="text-green">kevin@velazquez</span>:
              <span className="text-blue">~</span>${" "}
              <span
                className="inline-block h-[15px] w-2 translate-y-[2px] bg-accent motion-safe:animate-[blink_1.1s_step-end_infinite]"
                aria-hidden="true"
              />
            </div>
          </TerminalWindow>

          <div>
            <h2 className="mb-3 font-mono text-sm font-semibold text-accent">
              Direct links
            </h2>
            <ContactLinks links={links} />
          </div>
        </div>
      </div>
    </div>
  );
}
