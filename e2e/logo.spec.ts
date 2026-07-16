import { expect, test } from "@playwright/test";

const logoName = "Kevin Velázquez — home";

test.describe("animated K logo", () => {
  test("uses the specified construction and interaction animations", async ({
    page,
  }) => {
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

    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      /\/icon\.svg/,
    );
  });

  test("uses the approved colors in both themes", async ({ page }) => {
    await page.goto("/");

    const darkLogo = page.getByRole("link", { name: logoName });
    await expect(darkLogo).toHaveCSS("color", "rgb(226, 137, 76)");
    await darkLogo.hover();
    await expect(darkLogo).toHaveCSS("color", "rgb(239, 154, 94)");

    await page.mouse.move(0, 0);
    await page.evaluate(() => localStorage.setItem("theme", "light"));
    await page.reload();

    const lightLogo = page.getByRole("link", { name: logoName });
    await expect(lightLogo).toHaveCSS("color", "rgb(159, 75, 24)");
    await lightLogo.hover();
    await expect(lightLogo).toHaveCSS("color", "rgb(184, 91, 34)");
    await expect(lightLogo).toHaveCSS("filter", "none");
  });

  test("disables motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const logo = page.getByRole("link", { name: logoName });

    await expect(logo.locator(".k-logo__pipe")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(logo.locator(".k-logo__chevron")).toHaveCSS(
      "animation-name",
      "none",
    );
  });
});
