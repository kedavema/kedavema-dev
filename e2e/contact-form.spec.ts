import { expect, test } from "@playwright/test";

test.describe("contact form submission", () => {
  test("submits successfully against a mocked API", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page.getByLabel("Subject").fill("Hello there");
    await page
      .getByLabel("Message")
      .fill("This is a message long enough to pass validation.");

    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByRole("status")).toContainText("Message sent");
  });

  test("shows fallback links when the API is unavailable", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({ status: 503, contentType: "application/json", body: "{}" });
    });

    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page.getByLabel("Subject").fill("Hello there");
    await page
      .getByLabel("Message")
      .fill("This is a message long enough to pass validation.");

    await page.getByRole("button", { name: /send message/i }).click();
    const status = page.getByRole("status");
    await expect(status).toContainText(/unavailable/i);
    await expect(status.getByRole("link", { name: "kedavema@gmail.com" })).toBeVisible();
  });
});
