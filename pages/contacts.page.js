import { expect } from '@playwright/test';
import { BasePage } from './base.page.js';

export class ContactsPage extends BasePage {
  constructor(page) {
    super(page);

    this.heroSection = page.locator('.contact-hero');
    this.heroTitle = this.heroSection.getByRole('heading', { name: 'Get In Touch' });

    this.getDirectionsButton = page.getByRole('button', { name: 'Get Directions' });
    this.callNowButton = page.getByRole('button', { name: 'Call Now' });
    this.sendEmailButton = page.getByRole('button', { name: 'Send Email' });

    this.openInMapsLink = page.getByRole('link', { name: /Open in Maps/i });
    this.businessHoursHeading = page.getByRole('heading', { name: 'Business Hours' });
    this.specialHoursHeading = page.getByRole('heading', { name: 'Special Hours' });

    this.contactFormSection = page.locator('section').filter({ hasText: 'Send Us a Message' });

    this.nameInput = page.getByPlaceholder('Your Name', { exact: true });
    this.emailInput = page.getByPlaceholder('Your Email', { exact: true });
    this.subjectInput = page.getByPlaceholder('Subject', { exact: true });
    this.messageInput = page.getByPlaceholder('Your Message', { exact: true });
    this.sendMessageButton = page.getByRole('button', { name: 'Send Message' });
    this.mailingListInput = page.getByPlaceholder('Your Email Address', { exact: true });

    this.subscribeButton = page.getByRole('button', { name: 'Subscribe' });

    this.cateringHeading = page.getByRole('heading', { name: 'Catering Services' });
    this.requestCateringButton = page.getByRole('button', { name: 'Request Catering Info' });
  }

  async open() {
    await super.open('/pages/contacts.php');
  }

  async verifyPageLoaded() {
    await this.verifyUrl('/pages/contacts.php');
    await expect(this.page).toHaveTitle('Burger Shop - Contacts');
    await expect(this.heroTitle).toBeVisible();
  }

  async sendMessage(name, email, subject, message) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.sendMessageButton.click();
  }

  async subscribeToMailingList(email) {
    await this.mailingListInput.fill(email);
    await this.subscribeButton.click();
  }
}