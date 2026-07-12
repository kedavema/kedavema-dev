import type { Metadata } from "next";
import { getPrinciples, getProfile } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Panel } from "@/components/ui/Panel";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

const profileForMetadata = getProfile();

export const metadata: Metadata = {
  title: `About — ${profileForMetadata.name}`,
  description: `${profileForMetadata.title} — background and experience.`,
};

export default function AboutPage() {
  const principles = getPrinciples();

  return (
    <div>
      <div className="mb-11 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <SectionEyebrow tone="accent" className="mb-3.5">
            ## about
          </SectionEyebrow>
          <h1 className="mb-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.028em] sm:text-[44px]">
            Backend-focused,
            <br />
            production-minded.
          </h1>
          <p className="mb-4 max-w-[600px] text-base leading-relaxed text-muted">
            Backend-focused full-stack developer with 4+ years building
            production web platforms end-to-end — backend services, cloud
            infrastructure, CI/CD, authentication, payments, internal tools,
            and AI-powered features.
          </p>
          <p className="mb-4 max-w-[600px] text-[15px] leading-relaxed text-muted">
            My strongest focus is backend architecture: designing clean,
            maintainable systems with domain-driven design, well-defined
            boundaries, and a bias toward production ownership. I care about
            the parts that keep a system healthy — observability, testing,
            security, and infrastructure — not just shipping features.
          </p>
          <p className="max-w-[600px] text-[15px] leading-relaxed text-muted">
            I&apos;ve worked across delivery, fintech, and education products,
            and I enjoy bringing AI capabilities into real products in a
            grounded, reliable way.
          </p>
        </div>

        <TerminalWindow
          title="profile.json"
          meta={<span className="font-mono text-[11px] text-green">● live</span>}
        >
          <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.75] text-faint">
            {"{\n"}
            {"  "}
            <span className="text-accent">&quot;role&quot;</span>
            {": "}
            <span className="text-json-str">
              &quot;Backend-focused FS Engineer&quot;
            </span>
            {",\n"}
            {"  "}
            <span className="text-accent">&quot;location&quot;</span>
            {": "}
            <span className="text-json-str">&quot;Paraguay&quot;</span>
            {",\n"}
            {"  "}
            <span className="text-accent">&quot;timezone&quot;</span>
            {": "}
            <span className="text-json-str">&quot;GMT-3&quot;</span>
            {",\n"}
            {"  "}
            <span className="text-accent">&quot;experience_years&quot;</span>
            {": "}
            <span className="text-blue">4</span>
            {",\n"}
            {"  "}
            <span className="text-accent">&quot;focus&quot;</span>
            {": ["}
            <span className="text-json-str">&quot;backend&quot;</span>
            {", "}
            <span className="text-json-str">&quot;cloud&quot;</span>
            {", "}
            <span className="text-json-str">&quot;AI&quot;</span>
            {"],\n"}
            {"  "}
            <span className="text-accent">&quot;languages&quot;</span>
            {": {\n"}
            {"    "}
            <span className="text-accent">&quot;es&quot;</span>
            {": "}
            <span className="text-json-str">&quot;native&quot;</span>
            {",\n"}
            {"    "}
            <span className="text-accent">&quot;en&quot;</span>
            {": "}
            <span className="text-json-str">&quot;B2 upper-int&quot;</span>
            {"\n  },\n"}
            {"  "}
            <span className="text-accent">&quot;available&quot;</span>
            {": "}
            <span className="text-blue">true</span>
            {",\n"}
            {"  "}
            <span className="text-accent">&quot;remote&quot;</span>
            {": "}
            <span className="text-blue">true</span>
            {"\n}"}
          </pre>
        </TerminalWindow>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {principles.map((principle) => (
          <Panel key={principle.key}>
            <div className="mb-2.5 font-mono text-[13px] font-semibold text-accent">
              {principle.key}
            </div>
            <div className="mb-2 font-display text-lg font-semibold">
              {principle.title}
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {principle.body}
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
