import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const staticRoutes = ["/", "/about", "/projects", "/projects/ai-knowledge-rag", "/resume", "/contact"];

for (const route of staticRoutes) {
  test(`no automatic a11y violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
