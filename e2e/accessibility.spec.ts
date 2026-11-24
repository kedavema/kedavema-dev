import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Lets the window-opening animations finish so contrast is checked at rest. */
async function analyze(page: Page) {
  await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished)));
  return new AxeBuilder({ page }).analyze();
}

const routes = ["/", "/work/mango", "/work/ai-knowledge-rag", "/contact", "/does-not-exist"];

// Windows open with a short animation; check contrast at rest, not mid-animation.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of routes) {
  test(`no automatic a11y violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await analyze(page);
    expect(results.violations).toEqual([]);
  });
}

test("no automatic a11y violations with a menu and a window open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Work", exact: true }).click();
  await expect(page.locator("#menu-work")).toBeVisible();
  let results = await analyze(page);
  expect(results.violations).toEqual([]);

  await page.locator("#menu-work").getByRole("button", { name: /Mango Payment/ }).click();
  await expect(page.getByRole("dialog", { name: "MANGOPAY.REC" })).toBeVisible();
  results = await analyze(page);
  expect(results.violations).toEqual([]);
});
