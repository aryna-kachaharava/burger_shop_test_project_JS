import { expect } from '@playwright/test';

export class BaseAuthModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#auth-modal');
    this.closeButton = this.modal.getByText('×');

    this.loginTab = this.modal.locator('.auth-tab').filter({ hasText: /^Login$/ });
    this.registerTab = this.modal.locator('.auth-tab').filter({ hasText: /^Register$/ });
  }

  async verifyModalVisible() {
    await expect(this.modal).toBeVisible();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.modal).toBeHidden();
  }
}