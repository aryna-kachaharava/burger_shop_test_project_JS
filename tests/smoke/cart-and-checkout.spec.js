import { test, expect } from '@playwright/test';
import { BurgerShopPage } from '../../pages/burgerShop.page.js';

test.describe('Smoke: Cart & Checkout Flow', () => {
  test('SMK-04: Add a product to the cart from the catalog', async ({ page }) => {
    test.fail(true, 'BUG-02: Cart displays 580 kcal for Chicago Style instead of 480 kcal listed on product card');
    const shopPage = new BurgerShopPage(page);
    await shopPage.open();
    await shopPage.openCategory('Hot Dogs');

    await shopPage.addProductToCart('Chicago Style');
    await shopPage.header.verifyCartCount(1);

    const cart = await shopPage.header.openCart();
    await cart.verifyVisible();
    await expect(cart.getCartItemByName('Chicago Style')).toBeVisible();
    await cart.verifyTotalPrice('6.99');
    await cart.verifyTotalCalories(480);
  });

  test('SMK-05: Clear the cart using the Clear Cart button', async ({ page }) => {
    const shopPage = new BurgerShopPage(page);
    await shopPage.open();
    await shopPage.openCategory('Hot Dogs');

    await shopPage.addProductToCart('Chicago Style');
    const cart = await shopPage.header.openCart();

    await cart.clickClearCart();
    await cart.verifyEmpty();
    await shopPage.header.verifyCartCount(0);
  });

  test('SMK-06: Complete order checkout with valid customer details', async ({ page }) => {
    test.fail(true, 'BUG-03: Cart is not cleared and #cart-count remains 1 after submitting an order');
    const shopPage = new BurgerShopPage(page);
    await shopPage.open();
    await shopPage.openCategory('Hot Dogs');

    await shopPage.addProductToCart('Classic Hot Dog');
    const cart = await shopPage.header.openCart();
    const orderModal = await cart.clickCheckout();

    await orderModal.submitOrder({
      name: 'Alex Smith',
      phone: '+15551234567',
      address: '123 Main St',
      paymentMethod: 'Cash on Delivery',
    });

    await expect(orderModal.modal).toBeHidden();
    await shopPage.header.verifyCartCount(0);
  });

  test('SMK-11: Add multiple items from different categories and verify cart totals', async ({ page }) => {
    const shopPage = new BurgerShopPage(page);
    await shopPage.open();

    await shopPage.openCategory('Hot Dogs');
    await shopPage.addProductToCart('Classic Hot Dog');

    await shopPage.openCategory('Burgers');
    await shopPage.addFirstProductToCart();

    await shopPage.header.verifyCartCount(2);
    const cart = await shopPage.header.openCart();
    await cart.verifyVisible();
    await expect(cart.getCartItemByName('Classic Hot Dog')).toBeVisible();
    await expect(cart.totalPrice).not.toHaveText('Total: $0.00');
  });

  test('SMK-12: Validate required fields on Checkout modal', async ({ page }) => {
    const shopPage = new BurgerShopPage(page);
    await shopPage.open();
    await shopPage.openCategory('Hot Dogs');

    await shopPage.addProductToCart('Classic Hot Dog');
    const cart = await shopPage.header.openCart();
    const orderModal = await cart.clickCheckout();

    await orderModal.verifyVisible();
    await orderModal.placeOrderButton.click();

    await expect(orderModal.modal).toBeVisible();
    await orderModal.verifyFieldRequiredValidation(orderModal.nameInput);
  });
});