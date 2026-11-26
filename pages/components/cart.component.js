import { expect } from '@playwright/test';
import { OrderModal } from './checkout.component.js';

export class Cart {
  constructor(page) {
    this.page = page;

    this.overlay = page.locator('#cart-overlay');
    this.title = this.overlay.getByRole('heading', { name: 'Your Order' });

    this.cartItemsContainer = this.overlay.locator('#cart-items');
    this.emptyCartMessage = this.cartItemsContainer.locator('.empty-cart');

    this.totalPrice = this.overlay.locator('#cart-total');
    this.totalCalories = this.overlay.locator('#cart-calories');


    this.buttonsContainer = this.overlay.locator('.cart-buttons');
    this.addToPlannerButton = this.buttonsContainer.getByRole('button', { name: 'Add to Planner' });
    this.clearCartButton = this.buttonsContainer.getByRole('button', { name: 'Clear Cart' });
    this.checkoutButton = this.buttonsContainer.getByRole('button', { name: 'Checkout' });
  }

  async verifyVisible() {
    await expect(this.overlay).toBeVisible();
  }

  async verifyEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.emptyCartMessage).toHaveText('Your cart is empty');
    await expect(this.totalPrice).toHaveText('Total: $0.00');
    await expect(this.totalCalories).toHaveText('Calories: 0 kcal');
  }

  async verifyTotalPrice(expectedPrice) {
    await expect(this.totalPrice).toHaveText(`Total: $${expectedPrice}`);
  }

  async verifyTotalCalories(expectedCalories) {
    await expect(this.totalCalories).toHaveText(`Calories: ${expectedCalories} kcal`);
  }
  getCartItemByName(productName) {
    return this.cartItemsContainer.locator('div').filter({ hasText: productName }).first();
  }


  async clickClearCart() {
  this.page.once('dialog', async (dialog) => {
    await dialog.accept();
  });
  await this.clearCartButton.click();
}

  async clickAddToPlanner() {
    await this.addToPlannerButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
    return new OrderModal(this.page);
  }
}