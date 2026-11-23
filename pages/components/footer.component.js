import { expect } from '@playwright/test';

export class Footer {
  constructor(page) {
    this.page = page;
    this.footerContainer = page.locator('footer');

    this.brandHeading = this.footerContainer.getByRole('heading', { name: 'Burger Shop' });
    this.contactHeading = this.footerContainer.getByRole('heading', { name: 'Contact Us' });
    this.openingHoursHeading = this.footerContainer.getByRole('heading', { name: 'Opening Hours' });

    this.socialLinks = this.footerContainer.locator('.footer-section').first().locator('a');

    this.addressText = this.footerContainer.getByText('123 Burger Street, Foodville');
    this.phoneText = this.footerContainer.getByText('(555) 123-4567');
    this.emailText = this.footerContainer.getByText('info@burgershop.com');

    this.weekdayHours = this.footerContainer.getByText('Monday - Friday: 10am - 10pm');
    this.weekendHours = this.footerContainer.getByText('Saturday - Sunday: 11am - 11pm');

    this.footerBottom = this.footerContainer.locator('.footer-bottom');
    this.copyrightText = this.footerBottom.getByText('© 2026 Burger Shop. All Rights Reserved.');

    this.emailInput = this.footerContainer.getByPlaceholder('Add email');
    this.messageInput = this.footerContainer.getByPlaceholder('Your message');
    this.sendButton = this.footerContainer.getByRole('button', { name: 'Send' });
  }

  async sendFeedback(email, message) {
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
    await this.sendButton.click();
  }

  async verifyFooterVisible() {
    await expect(this.footerContainer).toBeVisible();
    await expect(this.contactHeading).toBeVisible();
    await expect(this.openingHoursHeading).toBeVisible();
    await expect(this.copyrightText).toBeVisible();
  }
}