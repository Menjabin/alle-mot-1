import { expect } from "@playwright/test";
import { resultsUrl } from "../util/urls";

export class ResultsPage {
  page;
  missingMessage;
  slider;

  constructor(page) {
    this.page = page;

    this.loadingIndicator = page.getByRole("img", { name: /loading/i });

    this.missingMessage = page.locator("p");
    this.slider = page.locator("div#container");
  }

  async goto() {
    await this.page.goto(resultsUrl);
    await expect(this.loadingIndicator).toBeHidden();
    await expect(this.missingMessage.or(this.slider)).toBeVisible();
  }

  async answersAreMissing() {
    await expect(this.missingMessage).toBeVisible();
  }

  async sliderIsVisible() {
    await expect(this.slider).toBeVisible();
  }
}
