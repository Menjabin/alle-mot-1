import { contestantUrl } from "../util/urls";

export class ContestantPage {
  page;
  question;
  answerButton;

  constructor(page) {
    this.page = page;

    this.loadingIndicator = page.getByRole("img", { name: /loading/i });

    this.question = page.getByRole("heading");
    this.answerButton = page.getByRole("button", {
      name: /send inn svar/i,
    });
  }

  async goto() {
    await this.page.goto(contestantUrl);
    await this.loadingIndicator.waitFor({ state: "detached" });
  }

  async answer() {
    await this.answerButton.click();
  }
}
