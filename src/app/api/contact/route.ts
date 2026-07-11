import { NextResponse } from "next/server";
import { contactSchema, isHoneypotFilled } from "@/lib/contact/schema";
import { isContactConfigured, sendContactEmail } from "@/lib/contact/sendContactEmail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (isHoneypotFilled(parsed.data)) {
    return NextResponse.json({ ok: true });
  }

  if (!isContactConfigured()) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  try {
    const { name, email, subject, message } = parsed.data;
    await sendContactEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
