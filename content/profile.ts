import { profileSchema, type Profile } from "./types";

export const profile: Profile = profileSchema.parse({
  name: "Kevin Velázquez",
  title: "Senior Backend Engineer",
  location: "Asunción, Paraguay",
  hometown: "Ypacaraí",
  email: "kedavema@gmail.com",
  lead: "I build identity verification, sign-in, payments and the AWS infrastructure under them. Five years across fintech, delivery and education, mostly TypeScript on PostgreSQL.",
  now: "Mango, a digital wallet in Paraguay. KYC onboarding: face matching that catches duplicate accounts and verification jobs that recover on their own.",
  availability: "Open to remote roles.",
  summary:
    "Senior backend engineer in Asunción, Paraguay. Identity verification, sign-in, payments and AWS infrastructure, mostly in TypeScript and PostgreSQL.",
});
