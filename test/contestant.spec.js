import { test, expect } from "@playwright/test";
import { AdminPage } from "./pages/admin-page";
import { ContestantPage } from "./pages/contestant-page";

test("Contestant can see question and answer when game is not active", async ({
  page,
}) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();

  const stopAnswersButton = adminPage.stopAnswersButton;
  const areAnswersStopped = !(await stopAnswersButton.isVisible());
  if (!areAnswersStopped) await adminPage.stopAnswers();

  const contestantPage = new ContestantPage(page);
  await contestantPage.goto();

  const question = contestantPage.question;
  await expect(question).toBeVisible();

  const answerButton = contestantPage.answerButton;
  await expect(answerButton).toBeVisible();

  if (!areAnswersStopped) {
    await adminPage.goto();
    await adminPage.activateAnyQuestion();
  }
});

test("Contestant can see question and answer when game is active", async ({
  page,
}) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();
  await adminPage.activateAnyQuestion();

  const contestantPage = new ContestantPage(page);
  await contestantPage.goto();

  const question = contestantPage.question;
  await expect(question).toBeVisible();

  await contestantPage.answer();
});
