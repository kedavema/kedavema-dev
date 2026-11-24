"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import type { Links } from "@content/types";
import { toMorse } from "@/lib/morse";
import { ContactLinks } from "./ContactLinks";

type Field = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<Field, string[]>>;
type Status = "idle" | "sending" | "sent" | "invalid" | "unavailable";

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** The contact form, dressed as a telegram from Tacuaral station. Posts to /api/contact. */
export function TelegramForm({ links }: { links: Links }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const payload = {
      name,
      email: String(data.get("email") ?? ""),
      subject: `Telegram from ${name || "kedavema.dev"}`,
      message,
      company: String(data.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSentMessage(message);
        setMessage("");
        setStatus("sent");
        return;
      }
      if (response.status === 400) {
        const body = await response.json();
        setErrors(body.fieldErrors ?? {});
        setStatus("invalid");
        return;
      }
      setStatus("unavailable");
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3.5">
        <div className="text-dim">TRANSMITTING TO {links.email.toUpperCase()}</div>
        <div className="break-words border-2 border-line bg-well px-3 py-2.5 tracking-[2px] text-link">
          {toMorse(`${sentMessage} stop`)}
        </div>
        <div>
          <span aria-hidden="true" className="text-ok">
            ●{" "}
          </span>
          Telegram delivered. I&apos;ll reply by email. STOP
        </div>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div role="status" className="flex flex-col gap-3">
        <p className="m-0">The telegraph line is down right now. Reach me directly instead:</p>
        <ContactLinks links={links} />
      </div>
    );
  }

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} role="alert" className="m-0 text-error">
        {errors[field]![0]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
      <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-name`} className="text-link">
          Name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          className="field"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
        />
        {fieldError("name")}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-email`} className="text-link">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="field"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
        />
        {fieldError("email")}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-message`} className="text-link">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={`${id}-message-hint${errors.message ? ` ${id}-message-error` : ""}`}
        />
        <span id={`${id}-message-hint`} className="text-dim">
          {countWords(message)} words · we add the STOP
        </span>
        {fieldError("message")}
        {fieldError("subject")}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-5 pt-1.5">
        <button type="submit" className="dos dos-hot" disabled={status === "sending"}>
          {status === "sending" ? "< Sending… >" : "< Send telegram >"}
        </button>
      </div>
    </form>
  );
}
