import { Resend } from "resend";
import type { ContactInput } from "./schema";
import { senderAddress, telegramHtml, telegramSubject, telegramText } from "./telegramEmail";

export function isContactConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL,
  );
}

/** Sends a telegram from the site to Kevin's inbox. Replying goes straight to the visitor. */
export async function sendContactEmail(input: Omit<ContactInput, "company">): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Contact email is not configured.");
  }

  const telegram = { name: input.name, email: input.email, message: input.message, receivedAt: new Date() };
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: senderAddress(from),
    to,
    replyTo: input.email,
    subject: telegramSubject(telegram),
    text: telegramText(telegram),
    html: telegramHtml(telegram),
  });

  if (error) {
    throw new Error("Failed to send contact email.");
  }
}
