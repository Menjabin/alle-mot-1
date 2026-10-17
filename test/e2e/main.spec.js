import { test, expect } from "@playwright/test";
import { AdminPage } from "./pages/admin-page";
import { MainPage } from "./pages/main-page";

test("Users cannot see nor answer question when game is not active", async ({
  page,
}) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();

  const stopAnswersButton = adminPage.stopAnswersButton;
  const areAnswersStopped = !(await stopAnswersButton.isVisible());
  if (!areAnswersStopped) await adminPage.stopAnswers();

  const mainPage = new MainPage(page);
  await mainPage.goto();

  const question = mainPage.question;
  await expect(question).not.toBeVisible();

  const answerButton = mainPage.answerButton;
  await expect(answerButton).not.toBeVisible();

  if (!areAnswersStopped) {
    await adminPage.goto();
    await adminPage.activateAnyQuestion();
  }
});

test("Users can see question and submit answer when game is active", async ({
  page,
}) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();
  await adminPage.activateAnyQuestion();

  const mainPage = new MainPage(page);
  await mainPage.goto();

  const question = mainPage.question;
  await expect(question).toBeVisible();

  await mainPage.answer();
});
