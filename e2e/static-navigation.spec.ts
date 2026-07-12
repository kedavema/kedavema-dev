import { expect, test } from "@playwright/test";

test.describe("static route navigation", () => {
  test("navigates through the main nav links", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
    const nav = page.getByRole("navigation");

    await nav.getByRole("link", { name: "about" }).click();
    await expect(page).toHaveURL("/about");

    await nav.getByRole("link", { name: "projects" }).click();
    await expect(page).toHaveURL("/projects");

    await nav.getByRole("link", { name: "résumé" }).click();
    await expect(page).toHaveURL("/resume");

    await nav.getByRole("link", { name: "contact" }).click();
    await expect(page).toHaveURL("/contact");

    await nav.getByRole("link", { name: "home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("navigates from the projects list to a project detail page", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: /ai knowledge rag/i }).click();
    await expect(page).toHaveURL("/projects/ai-knowledge-rag");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
