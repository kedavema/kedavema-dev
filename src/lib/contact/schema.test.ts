import { describe, expect, it } from "vitest";
import { contactSchema, isHoneypotFilled } from "./schema";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello there",
  message: "This is a message long enough to pass validation.",
};

describe("contactSchema", () => {
  it("accepts a valid payload without a company field", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company).toBe("");
    }
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, subject: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "short" });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from string fields", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      name: "  Jane Doe  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jane Doe");
    }
  });
});

describe("isHoneypotFilled", () => {
  it("returns false when company is empty", () => {
    expect(isHoneypotFilled({ company: "" })).toBe(false);
  });

  it("returns true when company has any content", () => {
    expect(isHoneypotFilled({ company: "spambot inc" })).toBe(true);
  });
});
