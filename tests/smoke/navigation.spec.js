import { test, expect } from '@playwright/test';
import { BurgerShopPage } from '../../pages/burgerShop.page.js';
import { ContactsPage } from '../../pages/contacts.page.js';
import { AboutUsPage } from '../../pages/aboutUs.page.js';
import { MenuPlannerPage } from '../../pages/menuPlanner.page.js';

test.describe('Smoke: Navigation & Static Pages', () => {
    test('SMK-01: Load main page and verify core UI elements', async ({ page }) => {
        const shopPage = new BurgerShopPage(page);
        await shopPage.open();

        await expect(shopPage.header.logo).toBeVisible();
        await expect(shopPage.header.homeLink).toBeVisible();
        await expect(shopPage.header.contactsLink).toBeVisible();
        await expect(shopPage.header.aboutUsLink).toBeVisible();
        await expect(shopPage.header.menuPlannerLink).toBeVisible();
        await expect(shopPage.header.loginButton).toBeVisible();
        await expect(shopPage.header.registerButton).toBeVisible();
        await shopPage.header.verifyCartCount(0);

        await expect(shopPage.menuHeader.menuContainer).toBeVisible();
        await expect(shopPage.productsContainer).toBeVisible();
        await expect(shopPage.footer.footerContainer).toBeVisible();
    });

    test('SMK-02: Switch menu categories and update product catalog', async ({ page }) => {
        const shopPage = new BurgerShopPage(page);
        await shopPage.open();

        await shopPage.openCategory('Hot Dogs');
        await shopPage.verifyUrl('/pages/hotdogs.php');

        await expect(shopPage.getProductCardByName('Classic Hot Dog')).toBeVisible();
        await expect(shopPage.getProductCardByName('Chicago Style')).toBeVisible();
        await expect(shopPage.getProductCardByName('Chili Cheese Dog')).toBeVisible();
    });

    test('SMK-03: Navigate across main website sections via top navigation bar', async ({ page }) => {
        const shopPage = new BurgerShopPage(page);
        const contactsPage = new ContactsPage(page);
        const aboutUsPage = new AboutUsPage(page);
        const plannerPage = new MenuPlannerPage(page);

        await shopPage.open();

        await shopPage.header.goToContacts();
        await contactsPage.verifyPageLoaded();

        await contactsPage.header.goToAboutUs();
        await aboutUsPage.verifyPageLoaded();
        await aboutUsPage.verifyFooterAbsent();

        await aboutUsPage.header.goToMenuPlanner();
        await plannerPage.verifyPageLoaded();

        await plannerPage.header.clickLogo();
        await expect(page).toHaveURL(/\/(index\.php)?$/);
    });

    test('SMK-14: Submit feedback form on the Contacts page', async ({ page }) => {
        test.fail(true, 'BUG-04: Submitting the feedback form on Contacts page redirects to a 404 Not Found page');
        const contactsPage = new ContactsPage(page);
        await contactsPage.open();
        await contactsPage.verifyPageLoaded();

        await contactsPage.sendMessage(
            'Ivan Petrov',
            'ivan@test.com',
            'Order question',
            'Hello, do you deliver after 9 PM?'
        );

        await expect(contactsPage.nameInput).toHaveValue('');
    });
});