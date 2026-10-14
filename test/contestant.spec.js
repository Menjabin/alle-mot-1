import { test, expect } from "@playwright/test";
import { contestantUrl } from "./util/urls";

test("Contestant still sees question when game is not active", async ({
  page,
}) => {
  await page.goto(contestantUrl);

  const question = page.getByRole("heading");
  await expect(question).toBeVisible();
});

test("Contestant can see question and submit answer", async ({ page }) => {
  await page.goto(contestantUrl);

  const question = page.getByRole("heading");
  await expect(question).toBeVisible();

  const button = page.getByRole("button", { name: /send inn svar/i });
  await expect(button).toBeVisible();
  await button.click();
});
