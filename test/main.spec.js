import { test, expect } from "@playwright/test";
import { mainUrl } from "./util/urls";

test("Users do not see question when game is not active", async ({ page }) => {
  await page.goto(mainUrl);

  const question = page.getByRole("heading");
  await expect(question).toBeVisible();
});

test("Users can see question and submit answer when game is active", async ({
  page,
}) => {
  await page.goto(mainUrl);

  const question = page.getByRole("heading");
  await expect(question).toBeVisible();

  const button = page.getByRole("button", { name: /send inn svar/i });
  await expect(button).toBeVisible();
  await button.click();
});
