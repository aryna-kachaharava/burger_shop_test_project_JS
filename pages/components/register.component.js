import { BaseAuthModal } from './baseAuth.component.js';
import { LoginModal } from './login.component.js';

export class RegisterModal extends BaseAuthModal {
  constructor(page) {
    super(page);

    this.fullNameInput = this.modal.getByLabel('Full Name');
    this.emailInput = this.modal.getByLabel('Email');
    this.passwordInput = this.modal.getByLabel('Password');
    this.submitRegisterButton = this.modal.getByRole('button', { name: 'Register' }).last();
    this.loginHereLink = this.modal.getByText('Login here');
  }

  async fillForm(fullName, email, password) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async register(fullName, email, password) {
    await this.verifyModalVisible();
    await this.fillForm(fullName, email, password);
    await this.submitRegisterButton.click();
  }

  async clickLoginHereLink() {
    await this.loginHereLink.click();
    return new LoginModal(this.page);
  }

  async switchToLoginTab() {
    await this.loginTab.click();
    return new LoginModal(this.page);
  }
}