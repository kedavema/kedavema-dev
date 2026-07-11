import { expect, test } from "@playwright/test";

test.describe("terminal flow", () => {
  test("help -> skills -> projects -> case-study -> contact", async ({ page }) => {
    await page.goto("/");
    const input = page.getByRole("textbox", { name: /terminal command input/i });
    const log = page.getByRole("log", { name: "Terminal output" });

    await input.fill("help");
    await input.press("Enter");
    await expect(log).toContainText("Available commands:");

    await input.fill("skills");
    await input.press("Enter");
    await expect(log).toContainText("Skills:");

    await input.fill("projects");
    await input.press("Enter");
    await expect(log).toContainText("Featured projects:");
    await expect(log).toContainText("AI Knowledge RAG");

    await input.fill("case-study ai-knowledge-rag");
    await input.press("Enter");
    await expect(log).toContainText("Problem");
    await expect(log).toContainText("Approach");

    await input.fill("contact");
    await input.press("Enter");
    await expect(log).toContainText("Or use the form below:");
    await expect(page.getByRole("form").or(page.locator("form"))).toBeVisible();
  });

  test("chips dispatch the same commands as typed input", async ({ page }) => {
    await page.goto("/");
    const log = page.getByRole("log", { name: "Terminal output" });

    await page.getByRole("button", { name: "Run command: help" }).click();
    await expect(log).toContainText("Available commands:");

    await page.getByRole("button", { name: "Run command: clear" }).click();
    await expect(log).not.toContainText("Available commands:");
  });
});
