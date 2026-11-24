import { expect, test } from "@playwright/test";

test.describe("keyboard shortcuts", () => {
  test("T opens the telegram and H the keyboard help", async ({ page }) => {
    await page.goto("/");
    await page.locator("body").click({ position: { x: 5, y: 300 } });

    await page.keyboard.press("t");
    const telegram = page.getByRole("dialog", { name: /TELEGRAM/ });
    await expect(telegram).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(telegram).toBeHidden();

    await page.keyboard.press("h");
    await expect(page.getByRole("dialog", { name: "KEYBOARD" })).toBeVisible();
  });
});

test.describe("boot screen", () => {
  test("shows once per session and skips on any key", async ({ page }) => {
    // The boot screen stays off for automated browsers; pretend to be a person.
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });
    await page.goto("/");

    const boot = page.getByTestId("boot-screen");
    await expect(boot).toBeVisible();
    await page.keyboard.press("Space");
    await expect(boot).toBeHidden();

    await page.reload();
    await expect(boot).toBeHidden();
  });
});
