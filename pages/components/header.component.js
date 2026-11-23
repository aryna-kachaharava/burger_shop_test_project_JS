import { expect } from '@playwright/test';
import { Cart} from './components/cart.component.js';
import { RegisterModal } from './components/register.component.js';
import { LoginModal } from './components/login.component.js';
import { AboutUsPage } from './pages/aboutUs.page.js';
import { BurgerShopPage } from './pages/burgerShop.page.js';
import { ContactsPage } from './pages/contacts.page.js';
import { AboutUsPage } from './pages/aboutUs.page.js';


export class Header{
    constructor(page){
        this.page = page;

        this.headerContainer = page.locator('.main-header');

        this.logo = this.headerContainer.getByRole('link',{name:'Burger Shop'});
        this.homeLink = this.headerContainer.getByRole('link', { name: 'Home' });
        this.contactsLink = this.headerContainer.getByRole('link', { name: 'Contacts' });
        this.aboutUsLink = this.headerContainer.getByRole('link', { name: 'About Us' });
        this.menuPlannerLink = this.headerContainer.getByRole('link', { name: 'Menu Planner' });

        this.loginButton = this.headerContainer.getByRole('button', { name: 'Login' });
        this.registerButton = this.headerContainer.getByRole('button', { name: 'Register' });

        this.cartIcon = page.locator('#cart-icon');
        this.cartCounter = page.locator('#cart-count');
    }
    async clickLogo() {
        await this.logo.click();
        return new BurgerShopPage(this.page);
    }

    async goToHome() {
        await this.homeLink.click();
        return new BurgerShopPage(this.page);
    }

    async goToContacts() {
        await this.contactsLink.click();
        return new ContactsPage(this.page);
    }

    async goToAboutUs() {
        await this.aboutUsLink.click();
        return new AboutUsPage(this.page);
    }

    async goToMenuPlanner() {
        await this.menuPlannerLink.click();
        return new MenuPlannerPage(this.page);
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
        await this.cartIcon.click();
        return new Cart(this.page);
    }

    async verifyCartCount(expectedCount) {
        await expect(this.cartCounter).toHaveText(String(expectedCount));
    }
}