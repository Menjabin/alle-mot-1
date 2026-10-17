import { test, expect } from "@playwright/test";
import { AdminPage } from "./pages/admin-page";

test("Admin can see list of questions", async ({ page }) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();

  const count = await adminPage.questions.count();
  expect(count).toBeGreaterThan(0);
});

test("Admin can add and delete a question", async ({ page }) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();

  await adminPage.addQuestion();

  const questionCount = await adminPage.questions.count();
  const lastQuestionIndex = questionCount - 1;
  await adminPage.deleteQuestion(lastQuestionIndex);
});
