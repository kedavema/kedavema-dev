import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters.").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000),
  company: z.string().trim().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function isHoneypotFilled(input: Pick<ContactInput, "company">): boolean {
  return input.company.length > 0;
}
