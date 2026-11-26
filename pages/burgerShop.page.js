import { expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { MenuHeader } from './components/menuHeader.component.js';

export class BurgerShopPage extends BasePage {
  constructor(page) {
    super(page);
    this.menuHeader = new MenuHeader(page);

    this.productsContainer = page.locator('.products-container');
    this.sectionTitle = this.productsContainer.locator('h1, h2').first();
    this.productCards = this.productsContainer.locator('.product-card, .card');
  }

  async openCategory(categoryName) {
    await this.menuHeader.selectCategory(categoryName);
    await this.verifyCategoryLoaded(categoryName);
  }
  
  async verifyCategoryLoaded(categoryName) {
  await expect(this.page).toHaveTitle(`Burger Shop - ${categoryName}`);
  await expect(this.sectionTitle).toBeVisible();
  await expect(this.sectionTitle).toContainText(categoryName, { ignoreCase: true });
}

  getProductCardByName(productName) {
  return this.productsContainer
    .locator('button.add-to-cart[data-name="' + productName + '"]')
    .locator('xpath=ancestor::div[1]');
  }

async addProductToCart(productName) {
  await this.productsContainer
    .locator(`button.add-to-cart[data-name="${productName}"]`)
    .click();
  }

  async addFirstProductToCart() {
    await this.productsContainer.getByRole('button', { name: 'Add to Cart' }).first().click();
  }
}