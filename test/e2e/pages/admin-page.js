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
    await this.loadingIndicator.waitFor({ state: "detached" });
  }

  async addQuestion() {
    await this.addQuestionButton.click();
    await this.page.waitForResponse((response) => response.status() === 200);
  }

  async deleteQuestion(index) {
    const question = this.questions.nth(index);
    const deleteButton = question.locator("td > button").nth(0);
    await deleteButton.click();
    await this.page.waitForResponse((response) => response.status() === 200);
  }

  /**
   * Activate a given question in the list.
   */
  async activateQuestion(index) {
    this.page.on("dialog", (dialog) => dialog.accept());

    const question = this.questions.nth(index);
    const activateButton = question.getByRole("button", {
      name: /gjør aktiv/i,
    });
    await activateButton.click();

    await this.page.waitForResponse((response) => response.status() === 200);
  }

  /**
   * Iterate through all questions, and activate the first available one.
   */
  async activateAnyQuestion() {
    this.page.on("dialog", (dialog) => dialog.accept());

    const count = await this.questions.count();
    for (let i = 0; i < count; i++) {
      const question = await this.questions.nth(i);
      const activateButton = question.getByRole("button", {
        name: /gjør aktiv/i,
      });
      if (await activateButton.isVisible()) {
        await activateButton.click();

        await this.page.waitForResponse(
          (response) => response.status() === 200,
        );
        return;
      }
    }
  }

  async stopAnswers() {
    await this.stopAnswersButton.click();
    await this.page.waitForResponse((response) => response.status() === 200);
  }
}
