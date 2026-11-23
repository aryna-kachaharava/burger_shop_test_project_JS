import { expect } from '@playwright/test';

export class BaseAuthModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#auth-modal');
    this.closeButton = this.modal.getByText('×');

    this.loginTab = this.modal.locator('button, .tab').filter({ hasText: /^Login$/ }).first();
    this.registerTab = this.modal.locator('button, .tab').filter({ hasText: /^Register$/ }).first();
  }

  async verifyModalVisible() {
    await expect(this.modal).toBeVisible();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.modal).toBeHidden();
  }
}