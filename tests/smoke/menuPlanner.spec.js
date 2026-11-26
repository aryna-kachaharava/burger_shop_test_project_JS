import { test, expect } from '@playwright/test';
import { MenuPlannerPage } from '../../pages/menuPlanner.page.js';

test.describe('Smoke: Menu Planner', () => {
  test('SMK-09: Calculate daily calorie needs in Menu Planner', async ({ page }) => {
    const plannerPage = new MenuPlannerPage(page);
    await plannerPage.open();
    await plannerPage.verifyPageLoaded();

    await plannerPage.calculateCalorieNeeds({
      currentWeight: 80,
      targetWeight: 72,
      height: 175,
      speed: 0.5,
      age: 28,
      gender: 'Female',
    });

    await expect(plannerPage.calculatorSection).toContainText(/kcal/i);
  });

  test('SMK-10: Add a meal to the weekly menu planner', async ({ page }) => {
    const plannerPage = new MenuPlannerPage(page);
    await plannerPage.open();

    await plannerPage.addMealToPlanner('Grilled Salmon');
    await plannerPage.calculateWeeklyCalories();

    await expect(plannerPage.totalWeeklyCaloriesText).not.toHaveText(/Total Weekly Calories:\s*0 kcal/);
  });

  test('SMK-15: Populate weekly planner with demo meals and clear planner', async ({ page }) => {
    const plannerPage = new MenuPlannerPage(page);
    await plannerPage.open();

    await plannerPage.addRandomMeals();
    await plannerPage.calculateWeeklyCalories();
    await expect(plannerPage.totalWeeklyCaloriesText).not.toHaveText(/Total Weekly Calories:\s*0 kcal/);
    await plannerPage.clearPlanner();
    await expect(plannerPage.getDayCard('Monday')).toContainText('No items planned');
  });
});