import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const staticRoutes = ["/", "/about", "/projects", "/projects/ai-knowledge-rag", "/resume", "/contact"];
const themes = ["dark", "light"] as const;

for (const route of staticRoutes) {
  for (const theme of themes) {
    test(`no automatic a11y violations on ${route} in ${theme} theme`, async ({ page }) => {
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem("theme", selectedTheme);
      }, theme);
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
