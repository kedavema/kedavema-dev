import { formatAsuncionDateTime } from "@/lib/clock";

export type Telegram = {
  name: string;
  email: string;
  message: string;
  receivedAt: Date;
};

const PREVIEW_LENGTH = 50;

/** Display name shown in the inbox when CONTACT_FROM_EMAIL is a bare address. */
export const SENDER_NAME = "kedavema.dev telegraph";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "Telegram from Ana: Hi Kevin, are you open to a backend role on…" */
export function telegramSubject({ name, message }: Pick<Telegram, "name" | "message">): string {
  const oneLine = message.replace(/\s+/g, " ").trim();
  const preview = oneLine.length > PREVIEW_LENGTH ? `${oneLine.slice(0, PREVIEW_LENGTH).trimEnd()}…` : oneLine;
  return preview ? `Telegram from ${name}: ${preview}` : `Telegram from ${name}`;
}

/** Adds the sender name unless the configured address already has one ("Name <a@b.c>"). */
export function senderAddress(configured: string): string {
  return configured.includes("<") ? configured : `${SENDER_NAME} <${configured}>`;
}

export function telegramText({ name, email, message, receivedAt }: Telegram): string {
  return [
    "TELEGRAM · TACUARAL STATION",
    `kedavema.dev · received ${formatAsuncionDateTime(receivedAt)} (Asunción)`,
    "",
    `FROM:     ${name}`,
    `REPLY TO: ${email}`,
    "",
    message.trim(),
    "",
    "STOP",
    "--",
    `Hit reply to answer ${name} directly.`,
  ].join("\n");
}

/** The telegram as an HTML email. Inline styles and tables only, so it holds up in Gmail and Outlook. */
export function telegramHtml({ name, email, message, receivedAt }: Telegram): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, "<br>");
  const font = "'Courier New', Courier, monospace";
  const muted = "#5d5f66";

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px 12px;background:#0f2a27;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#f4efe1;border:3px double #0b0f0e;font-family:${font};color:#0b0f0e;">
  <tr><td style="background:#e2894c;padding:6px 14px;font-size:14px;letter-spacing:2px;text-align:center;">TELEGRAM · TACUARAL STATION</td></tr>
  <tr><td style="padding:20px 24px 6px;font-size:13px;color:${muted};">kedavema.dev · received ${formatAsuncionDateTime(receivedAt)} (Asunción)</td></tr>
  <tr><td style="padding:6px 24px 10px;font-size:15px;line-height:1.6;">
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr><td style="padding-right:16px;color:${muted};">FROM</td><td><strong>${safeName}</strong></td></tr>
      <tr><td style="padding-right:16px;color:${muted};">REPLY TO</td><td><a href="mailto:${safeEmail}" style="color:#9a3c0b;">${safeEmail}</a></td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:16px 24px 6px;border-top:1px dashed #0b0f0e;font-size:17px;line-height:1.6;">${safeMessage}</td></tr>
  <tr><td style="padding:6px 24px 20px;font-size:15px;letter-spacing:3px;">STOP</td></tr>
  <tr><td style="padding:12px 24px 18px;border-top:1px dashed #0b0f0e;font-size:13px;color:${muted};">Hit reply to answer ${safeName} directly.</td></tr>
</table>
</td></tr></table>
</body>
</html>`;
}
