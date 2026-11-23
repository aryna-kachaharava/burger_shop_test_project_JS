import { BaseAuthModal } from './baseAuth.component.js';
import { RegisterModal } from './register.component.js';

export class LoginModal extends BaseAuthModal {
  constructor(page) {
    super(page);

    this.emailInput = this.modal.getByLabel('Email');
    this.passwordInput = this.modal.getByLabel('Password');
    this.submitLoginButton = this.modal.getByRole('button', { name: 'Login' }).last();
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
    await this.loginTab.click();
    return new RegisterModal(this.page);
  }
}