import { expect } from '@playwright/test';
import { Header } from './components/header.component.js';
import { Footer } from './components/footer.component.js';

export class BasePage {
  constructor(page) {
    this.page = page;

    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async open(path = '/index.php') {
  await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async verifyUrl(expectedUrlPart) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrlPart));
  }

  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}