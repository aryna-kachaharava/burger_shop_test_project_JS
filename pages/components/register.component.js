import { BaseAuthModal } from './baseAuth.component.js';
import { LoginModal } from './login.component.js';

export class RegisterModal extends BaseAuthModal {
  constructor(page) {
    super(page);

    this.registerForm = this.modal.locator('#register-form');
    this.fullNameInput = this.registerForm.locator('#register-name');
    this.emailInput = this.registerForm.locator('#register-email');
    this.passwordInput = this.registerForm.locator('#register-password');
    this.submitRegisterButton = this.registerForm.locator('#register-submit');
    this.loginHereLink = this.modal.getByText(/Login here/i);
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