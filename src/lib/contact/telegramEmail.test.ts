import { describe, expect, it } from "vitest";
import { senderAddress, telegramHtml, telegramSubject, telegramText } from "./telegramEmail";

const telegram = {
  name: "Ana",
  email: "ana@example.com",
  message: "Hi Kevin,\nare you open to a backend role?",
  receivedAt: new Date("2026-11-24T19:47:00Z"),
};

describe("telegram email", () => {
  it("previews the message in the subject", () => {
    expect(telegramSubject(telegram)).toBe("Telegram from Ana: Hi Kevin, are you open to a backend role?");
  });

  it("cuts long previews", () => {
    const subject = telegramSubject({ name: "Ana", message: "word ".repeat(40) });
    expect(subject.endsWith("…")).toBe(true);
    expect(subject.length).toBeLessThan(80);
  });

  it("names the sender unless the address already has a name", () => {
    expect(senderAddress("onboarding@resend.dev")).toBe("kedavema.dev telegraph <onboarding@resend.dev>");
    expect(senderAddress("Kevin <hi@kedavema.dev>")).toBe("Kevin <hi@kedavema.dev>");
  });

  it("writes a plain-text telegram with the Asunción time", () => {
    const text = telegramText(telegram);
    expect(text).toContain("FROM:     Ana");
    expect(text).toContain("REPLY TO: ana@example.com");
    expect(text).toContain("received 24 Nov 2026, 16:47 (Asunción)");
    expect(text).toContain("STOP");
  });

  it("escapes what visitors type before putting it in HTML", () => {
    const html = telegramHtml({ ...telegram, name: '<img src=x onerror="alert(1)">', message: "<script>x</script>\nbye" });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;x&lt;/script&gt;<br>bye");
  });
});
