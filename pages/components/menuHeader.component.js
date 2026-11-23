import { expect } from '@playwright/test';
export class MenuHeader {
  constructor(page) {
    this.page = page;

    this.menuContainer = page.locator('.menu-header');
    this.menuList = this.menuContainer.locator('.menu-list');
    this.categoryItems = this.menuList.locator('li');
  }

  getCategoryLocator(categoryName) {
    return this.menuList.getByText(categoryName, { exact: true });
  }

  async selectCategory(categoryName) {
    await this.getCategoryLocator(categoryName).click();
  }

  async verifyCategoriesVisible(categories) {
    for (const category of categories) {
      await expect(this.getCategoryLocator(category)).toBeVisible();
    }
  }
}