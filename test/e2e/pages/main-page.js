import { mainUrl } from "../util/urls";

export class MainPage {
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
    await this.page.goto(mainUrl);
    await this.loadingIndicator.waitFor({ state: "detached" });
  }

  async answer() {
    await this.answerButton.click();
    await this.page.waitForResponse((response) => response.status() === 200);
  }
}
