import { describe, expect, it } from "vitest";
import { getSiteUrl, SITE_URL } from "@/lib/seo/site";

describe("site URL", () => {
  it("keeps iamkev.vercel.app as the canonical domain", () => {
    expect(SITE_URL).toBe("https://iamkev.vercel.app");
    expect(getSiteUrl()).toBe(SITE_URL);
  });
});
