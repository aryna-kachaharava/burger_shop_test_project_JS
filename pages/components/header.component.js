import { expect } from '@playwright/test';
import { Cart } from './cart.component.js';
import { RegisterModal } from './register.component.js';
import { LoginModal } from './login.component.js';

export class Header {
    constructor(page) {
        this.page = page;

        this.headerContainer = page.locator('.main-header');

        this.logo = this.headerContainer.getByRole('link', { name: 'Burger Shop' });
        this.homeLink = this.headerContainer.getByRole('link', { name: 'Home' });
        this.contactsLink = this.headerContainer.getByRole('link', { name: 'Contacts' });
        this.aboutUsLink = this.headerContainer.getByRole('link', { name: 'About Us' });
        this.menuPlannerLink = this.headerContainer.getByRole('link', { name: 'Menu Planner' });

        this.loginButton = this.headerContainer.getByRole('button', { name: 'Login' });
        this.registerButton = this.headerContainer.getByRole('button', { name: 'Register' });

        this.userInfoContainer = page.locator('#user-info');
        this.userDisplayName = page.locator('#user-display-name');
        this.logoutButton = page.locator('#logout-btn');

        this.cartIcon = page.locator('#cart-icon');
        this.cartCounter = page.locator('#cart-count');
    }

    async clickLogo() {
        await this.logo.click();
    }

    async goToHome() {
        await this.homeLink.click();
    }

    async goToContacts() {
        await this.contactsLink.click();
    }

    async goToAboutUs() {
        await this.aboutUsLink.click();
    }

    async goToMenuPlanner() {
        await this.menuPlannerLink.click();
    }

    async openLoginModal() {
        await this.loginButton.click();
        return new LoginModal(this.page);
    }

    async openRegisterModal() {
        await this.registerButton.click();
        return new RegisterModal(this.page);
    }

    async openCart() {
    const cart = new Cart(this.page);
    if (!(await cart.overlay.isVisible())) {
        await this.cartIcon.click();
    }
    return cart;
    }

    async logout() {
        await this.logoutButton.click();
    }

    async verifyCartCount(expectedCount) {
        await expect(this.cartCounter).toHaveText(String(expectedCount));
    }
}