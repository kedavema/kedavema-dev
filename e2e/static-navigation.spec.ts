import { expect, test } from "@playwright/test";

test.describe("desktop navigation", () => {
  test("fits a 320px phone without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Velázquez");
    await expect(page.getByRole("button", { name: "Work", exact: true })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  });

  test("opens a job from the Work menu and follows it to the case study", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Work", exact: true }).click();
    await page.locator("#menu-work").getByRole("button", { name: /Mango Payment/ }).click();

    const job = page.getByRole("dialog", { name: "MANGOPAY.REC" });
    await expect(job).toBeVisible();
    await expect(job).toContainText("Backend Engineer");

    await job.getByRole("link", { name: /Case study/ }).click();
    await expect(page).toHaveURL("/work/mango");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);

    await page.getByRole("link", { name: /Back to the desktop/ }).click();
    await expect(page).toHaveURL(/\/#work-db$/);
  });

  test("opens a record from WORK.DB and closes it with Escape", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /Coderhouse/ }).first().click();
    const job = page.getByRole("dialog", { name: "CODERHOU.REC" });
    await expect(job).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(job).toBeHidden();
  });

  test("links the résumé PDF", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "RESUME.PDF" })).toHaveAttribute("href", "/resume.pdf");
  });

  test("redirects the old routes", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveURL("/");

    await page.goto("/projects/ai-knowledge-rag");
    await expect(page).toHaveURL("/work/ai-knowledge-rag");

    await page.goto("/projects/monchis");
    await expect(page).toHaveURL("/");
  });

  test("shows a file-not-found window for unknown pages", async ({ page }) => {
    const response = await page.goto("/nope");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("File not found.")).toBeVisible();
  });
});
