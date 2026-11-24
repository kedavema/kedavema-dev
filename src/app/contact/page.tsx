import type { Metadata } from "next";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { TelegramForm } from "@/components/contact/TelegramForm";
import { Window } from "@/components/desktop/Window";
import { getLinks, getProfile } from "@/lib/content";

const profile = getProfile();

export const metadata: Metadata = {
  title: `Contact · ${profile.name}`,
  description: `Get in touch with ${profile.name}, ${profile.title.toLowerCase()} in ${profile.location}.`,
};

export default function ContactPage() {
  const links = getLinks();

  return (
    <div className="mx-auto max-w-[720px]">
      <Window title="TELEGRAM · TACUARAL STATION" titleAs="h1" badge="T" active titleId="w-contact">
        <div className="flex flex-col gap-5">
          <p className="m-0 text-dim">
            {profile.hometown} grew around a railway stop from 1864 called Tacuaral. This is its telegraph
            office, back in service for this website.
          </p>
          {profile.availability && <p className="m-0">{profile.availability} Email works too:</p>}
          <ContactLinks links={links} />
          <div className="border-t border-line pt-5">
            <TelegramForm links={links} />
          </div>
        </div>
      </Window>
    </div>
  );
}
