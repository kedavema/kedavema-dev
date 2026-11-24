import { expect, test } from "@playwright/test";

const logoName = "Kevin Velázquez — home";

test.describe("animated K logo", () => {
  test("uses the specified construction and interaction animations", async ({ page }) => {
    await page.goto("/");

    const logo = page.getByRole("link", { name: logoName });
    const symbol = logo.locator("svg");
    const pipe = logo.locator(".k-logo__pipe");
    const chevron = logo.locator(".k-logo__chevron");
    const chevronPath = chevron.locator("path");

    await expect(logo).toBeVisible();
    await expect(symbol).toHaveAttribute("viewBox", "0 0 64 64");
    await expect(pipe).toHaveAttribute("x1", "19");
    await expect(pipe).toHaveAttribute("y1", "10");
    await expect(pipe).toHaveAttribute("x2", "19");
    await expect(pipe).toHaveAttribute("y2", "54");
    await expect(pipe).toHaveAttribute("stroke-width", "12");
    await expect(chevronPath).toHaveAttribute("d", "M47 10 27 32 47 54");
    await expect(chevronPath).toHaveAttribute("stroke-width", "12");
    await expect(pipe).toHaveCSS("animation-name", "k-logo-pipe");
    await expect(pipe).toHaveCSS("animation-duration", "0.75s");
    await expect(chevron).toHaveCSS("animation-name", "k-logo-chevron");
    await expect(chevron).toHaveCSS("animation-duration", "0.75s");

    await logo.hover();
    await expect(chevron).toHaveCSS("animation-name", "k-logo-hover");
    await expect(chevron).toHaveCSS("animation-duration", "0.3s");

    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /\/icon\.svg/);
  });

  test("uses dark orange on the menu bar and darkens on hover", async ({ page }) => {
    await page.goto("/");

    const logo = page.getByRole("link", { name: logoName });
    await expect(logo).toHaveCSS("color", "rgb(154, 60, 11)");
    await logo.hover();
    await expect(logo).toHaveCSS("color", "rgb(11, 15, 14)");
  });

  test("disables motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const logo = page.getByRole("link", { name: logoName });
    await expect(logo.locator(".k-logo__pipe")).toHaveCSS("animation-name", "none");
    await expect(logo.locator(".k-logo__chevron")).toHaveCSS("animation-name", "none");
  });
});
