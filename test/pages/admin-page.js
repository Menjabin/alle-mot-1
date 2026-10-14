import { adminUrl } from "../util/urls";

export class AdminPage {
  page;
  questions;
  addQuestionButton;
  stopAnswersButton;

  constructor(page) {
    this.page = page;

    this.loadingIndicator = page.getByRole("img", { name: /loading/i });

    this.stopAnswersButton = page.getByRole("button", {
      name: /steng for svar/i,
    });
    this.questions = page.locator("tr");
    this.addQuestionButton = page.getByRole("button", {
      name: /legg til spørsmål/i,
    });
  }

  async goto() {
    await this.page.goto(adminUrl);
    await this.loadingIndicator.waitFor({ state: "hidden" });
  }

  async addQuestion() {
    await this.addQuestionButton.click();
  }

  async deleteQuestion(index) {
    const question = this.questions.nth(index);
    const deleteButton = question.locator("td > button").nth(0);
    await deleteButton.click();
  }

  async activateQuestion(index) {
    const question = this.questions.nth(index);
    const activateButton = question.locator("button", { name: /gjør aktiv/i });
    await activateButton.click();
  }

  async stopAnswers() {
    await this.stopAnswersButton.click();
  }
}
