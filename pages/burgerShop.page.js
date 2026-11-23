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
    await expect(this.sectionTitle).toHaveText(`Delicious ${categoryName}`);
  }

  getProductCardByName(productName) {
    return this.productsContainer
      .locator('div')
      .filter({ has: this.page.getByRole('heading', { name: productName, exact: true }) })
      .first();
  }

  async addProductToCart(productName) {
    const card = this.getProductCardByName(productName);
    await card.getByRole('button', { name: 'Add to Cart' }).click();
  }

  async addFirstProductToCart() {
    await this.productsContainer.getByRole('button', { name: 'Add to Cart' }).first().click();
  }
}