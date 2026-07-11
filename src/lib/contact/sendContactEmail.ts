import { Resend } from "resend";
import type { ContactInput } from "./schema";

export function isContactConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL,
  );
}

export async function sendContactEmail(input: Omit<ContactInput, "company">): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Contact email is not configured.");
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `[Portfolio contact] ${input.subject}`,
    text: [
      `Source: portfolio contact form`,
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject}`,
      "",
      input.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error("Failed to send contact email.");
  }
}
