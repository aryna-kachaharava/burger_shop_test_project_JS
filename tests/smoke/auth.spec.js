import { test, expect } from '@playwright/test';
import { BurgerShopPage } from '../../pages/burgerShop.page.js';
import { LoginModal } from '../../pages/components/login.component.js';

test.describe('Smoke: Authentication', () => {
  const testPassword = 'Password123!';
  const fullName = 'Test User';

  test('SMK-07: Register a new user via the authentication modal', async ({ page }) => {
  const shopPage = new BurgerShopPage(page);
  await shopPage.open();

  const uniqueEmail = `qa_user_${Date.now()}@test.com`;
  const registerModal = await shopPage.header.openRegisterModal();
  await registerModal.register(fullName, uniqueEmail, testPassword);

  await expect(registerModal.fullNameInput).toBeHidden();
  await expect(page.locator('#login-form')).toBeVisible();
  await expect(page.locator('#login-email')).toHaveValue(uniqueEmail);
});

  test('SMK-08: Log in with an existing user account and log out', async ({ page }) => {
  const shopPage = new BurgerShopPage(page);
  await shopPage.open();

  const registerModal = await shopPage.header.openRegisterModal();
  const userEmail = `login_${Date.now()}@test.com`;
  await registerModal.register(fullName, userEmail, testPassword);

  const loginModal = new LoginModal(page);
  await loginModal.login(userEmail, testPassword);

  await expect(loginModal.modal).toBeHidden();
  await expect(shopPage.header.userInfoContainer).toBeVisible();

  await shopPage.header.logout();
  await expect(shopPage.header.loginButton).toBeVisible();
});

  test('SMK-13: Switch between Login and Register tabs inside the auth modal', async ({ page }) => {
    test.fail(true, 'BUG-01: Register tab/link does not switch back from Login form inside #auth-modal');
    const shopPage = new BurgerShopPage(page);
    await shopPage.open();

    const registerModal = await shopPage.header.openRegisterModal();
    await registerModal.verifyModalVisible();
    await expect(registerModal.fullNameInput).toBeVisible();

    const loginModal = await registerModal.clickLoginHereLink();
    await expect(registerModal.fullNameInput).toBeHidden();
    await expect(loginModal.submitLoginButton).toBeVisible();

    await loginModal.switchToRegisterTab();
    await expect(registerModal.fullNameInput).toBeVisible();
  });
});