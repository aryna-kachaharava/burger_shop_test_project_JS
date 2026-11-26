import { BaseAuthModal } from './baseAuth.component.js';
import { RegisterModal } from './register.component.js';

export class LoginModal extends BaseAuthModal {
  constructor(page) {
    super(page);

    this.loginForm = this.modal.locator('#login-form');
    this.emailInput = this.loginForm.locator('#login-email');
    this.passwordInput = this.loginForm.locator('#login-password');
    this.submitLoginButton = this.loginForm.locator('#login-submit, button:has-text("Login")').first();
    this.registerHereLink = this.modal.getByText(/Register here/i);
  }

  async login(email, password) {
    await this.verifyModalVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitLoginButton.click();
  }

  async clickRegisterHereLink() {
    await this.registerHereLink.click();
    return new RegisterModal(this.page);
  }

  async switchToRegisterTab() {
  await this.registerTab.click();
  return new RegisterModal(this.page);
  }
}