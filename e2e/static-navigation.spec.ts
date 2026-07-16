import { expect, test } from "@playwright/test";

test.describe("static route navigation", () => {
  test("keeps the mobile header navigation on one line", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");

    const header = page.getByRole("banner");
    const nav = page.getByRole("navigation");
    const mobileLinks = ["about", "projects", "résumé", "contact"];

    await expect(nav.getByRole("link", { name: "home" })).toBeHidden();
    await expect(
      page.getByRole("link", { name: "Kevin Velázquez — home" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();

    const linkTops = await Promise.all(
      mobileLinks.map(async (name) => {
        const link = nav.getByRole("link", { name });
        await expect(link).toBeVisible();
        return (await link.boundingBox())?.y;
      }),
    );

    expect(linkTops.every((top) => top === linkTops[0])).toBe(true);
    expect((await header.boundingBox())?.height).toBeLessThanOrEqual(56);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

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

  test("shows project status consistently across project pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("in development · deterministic", { exact: true })).toBeVisible();

    await page.goto("/projects");
    const projectLink = page.getByRole("link", { name: /ai knowledge rag/i });
    await expect(projectLink).toContainText("in development");
    await projectLink.click();
    await expect(page).toHaveURL("/projects/ai-knowledge-rag");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("in development · deterministic", { exact: true })).toBeVisible();
  });
});
