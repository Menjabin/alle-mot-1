import { test } from "@playwright/test";
import { AdminPage } from "./pages/admin-page";
import { ContestantPage } from "./pages/contestant-page";
import { MainPage } from "./pages/main-page";
import { ResultsPage } from "./pages/results-page";

test("Results are only visible when answers are provided", async ({ page }) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();
  await adminPage.activateAnyQuestion();

  const mainPage = new MainPage(page);
  await mainPage.goto();
  await mainPage.answer();

  const resultsPage = new ResultsPage(page);
  await resultsPage.goto();
  await resultsPage.answersAreMissing();

  const contestantPage = new ContestantPage(page);
  await contestantPage.goto();
  await contestantPage.answer();

  await resultsPage.goto();
  await resultsPage.sliderIsVisible();
});
