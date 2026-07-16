"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Links } from "@content/types";
import { ContactLinks } from "./ContactLinks";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string[]>>;

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

const inputClass =
  "w-full rounded border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

export function ContactForm({ links, compact = false }: { links: Links; compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (response.status === 400) {
        const body = await response.json();
        setFieldErrors(body.fieldErrors ?? {});
        setStatus("error");
        return;
      }

      setStatus("unavailable");
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-accent">
        Message sent — thanks for reaching out. I&apos;ll reply soon.
      </p>
    );
  }

  if (status === "unavailable") {
    return (
      <div role="status" className="space-y-3 text-sm">
        <p className="text-muted">
          Direct sending is unavailable right now. Reach out through one of these instead:
        </p>
        <ContactLinks links={links} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3 text-sm" : "space-y-4"} noValidate>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-1">
        <label htmlFor="name" className="block text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputClass}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />
        {fieldErrors.name && (
          <p id="name-error" role="alert" className="text-xs text-error">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="email-error" role="alert" className="text-xs text-error">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="subject" className="block text-muted">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className={inputClass}
          aria-invalid={fieldErrors.subject ? true : undefined}
          aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
        />
        {fieldErrors.subject && (
          <p id="subject-error" role="alert" className="text-xs text-error">
            {fieldErrors.subject[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="block text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 5}
          className={inputClass}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="message-error" role="alert" className="text-xs text-error">
            {fieldErrors.message[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded border border-border px-4 py-2 text-sm text-accent transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
