import { expect, test, type Page } from "@playwright/test";

async function fillTelegram(scope: ReturnType<Page["locator"]> | Page) {
  await scope.getByLabel("Name").fill("Jane Doe");
  await scope.getByLabel("Email").fill("jane@example.com");
  await scope.getByLabel("Message").fill("Are you open to a backend role on a remote team?");
}

test.describe("telegram (contact form)", () => {
  test("sends from the /contact page against a mocked API", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/contact");
    await fillTelegram(page);
    await page.getByRole("button", { name: /send telegram/i }).click();
    await expect(page.getByRole("status").filter({ hasText: "Telegram delivered" })).toBeVisible();
  });

  test("sends from the TELEGRAM window on the desktop", async ({ page }) => {
    let sent: Record<string, string> | undefined;
    await page.route("**/api/contact", async (route) => {
      sent = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/");
    await page.getByRole("button", { name: "TELEGRAM", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: /TELEGRAM/ });
    await expect(dialog).toBeVisible();

    await fillTelegram(dialog);
    await dialog.getByRole("button", { name: /send telegram/i }).click();
    await expect(dialog.getByRole("status")).toContainText("Telegram delivered");
    expect(sent?.subject).toBe("Telegram from Jane Doe");
  });

  test("falls back to direct links when the line is down", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({ status: 503, contentType: "application/json", body: "{}" });
    });

    await page.goto("/contact");
    await fillTelegram(page);
    await page.getByRole("button", { name: /send telegram/i }).click();
    const status = page.getByRole("status").filter({ hasText: /line is down/i });
    await expect(status).toBeVisible();
    await expect(status.getByRole("link", { name: "kedavema@gmail.com" })).toBeVisible();
  });
});
