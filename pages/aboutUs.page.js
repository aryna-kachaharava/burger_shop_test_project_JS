import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class AboutUsPage extends BasePage {
  constructor(page) {
    super(page);

    this.heroSection = page.locator('.about-hero');
    this.heroTitle = this.heroSection.getByRole('heading', { name: 'Our Story' });
    this.heroSubtitle = this.heroSection.getByText('Crafting delicious burgers since 2015 with passion and quality ingredients');

    this.storyHeading = page.getByRole('heading', { name: 'From Humble Beginnings' });
    this.burgerVarietiesStat = page.getByText('50+');
    this.happyCustomersStat = page.getByText('1000+');

    this.valuesHeading = page.getByRole('heading', { name: 'Our Core Values' });
    this.qualityFirstValue = page.getByRole('heading', { name: 'Quality First' });
    this.customerLoveValue = page.getByRole('heading', { name: 'Customer Love' });
    this.sustainabilityValue = page.getByRole('heading', { name: 'Sustainability' });

    this.teamHeading = page.getByRole('heading', { name: 'Meet Our Team' });
    this.michaelMember = page.getByRole('heading', { name: 'Michael Rodriguez' });
    this.sarahMember = page.getByRole('heading', { name: 'Sarah Chen' });
    this.davidMember = page.getByRole('heading', { name: 'David Kim' });

    this.testimonialsHeading = page.getByRole('heading', { name: 'What Our Customers Say' });
    this.jessicaReview = page.getByRole('heading', { name: 'Jessica P.' });
    this.robertReview = page.getByRole('heading', { name: 'Robert T.' });
    this.mariaReview = page.getByRole('heading', { name: 'Maria G.' });

    this.visitUsSection = page.locator('section').filter({ hasText: 'Experience the Burger Shop difference' });
    this.visitUsHeading = this.visitUsSection.getByRole('heading', { name: 'Visit Us' });
    this.viewMenuButton = this.visitUsSection.getByRole('button', { name: 'View Menu' });
    this.orderOnlineButton = this.visitUsSection.getByRole('button', { name: 'Order Online' });
    this.openInMapsLink = this.visitUsSection.getByRole('link', { name: /Open in Maps/i });
  }


  async open() {
    await super.open('/pages/about_us.php');
  }

  async verifyPageLoaded() {
    await this.verifyUrl('/pages/about_us.php');
    await expect(this.heroTitle).toBeVisible();
    await expect(this.storyHeading).toBeVisible();
    await expect(this.valuesHeading).toBeVisible();
    await expect(this.teamHeading).toBeVisible();
    await expect(this.testimonialsHeading).toBeVisible();
    await expect(this.visitUsHeading).toBeVisible();
  }

  async verifyFooterAbsent() {
    await expect(this.footer.footerContainer).toHaveCount(0);
  }

  async clickViewMenu() {
    await this.viewMenuButton.click();
  }

  async clickOrderOnline() {
    await this.orderOnlineButton.click();
  }
}