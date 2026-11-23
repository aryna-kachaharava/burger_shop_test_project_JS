import { expect } from '@playwright/test';
import { BasePage } from './pages/base.page.js';

export class PlannerPage extends BasePage {
  constructor(page) {
    super(page);

    this.plannerContainer = page.locator('.planner-container');
    this.pageHeading = this.plannerContainer.getByRole('heading', { name: 'Advanced Menu Planner' });

    this.calculatorSection = this.plannerContainer.locator('.calorie-calculator');
    this.currentWeightInput = this.calculatorSection.getByLabel('Current Weight (kg)');
    this.targetWeightInput = this.calculatorSection.getByLabel('Target Weight (kg)');
    this.heightInput = this.calculatorSection.getByLabel('Height (cm)');
    this.weightLossSpeedInput = this.calculatorSection.getByLabel('Weight Loss Speed (kg/week)');
    this.ageInput = this.calculatorSection.getByLabel('Age');
    this.genderSelect = this.calculatorSection.getByLabel('Gender');
    this.activityLevelSelect = this.calculatorSection.getByLabel('Activity Level');
    this.calculateNeedsButton = this.calculatorSection.getByRole('button', { name: 'Calculate My Calorie Needs' });

    this.formulasHeading = this.plannerContainer.getByText('Weight Loss Formulas');

    this.weeklyPlannerSection = this.plannerContainer.locator('.weekly-planner');
    this.calculateWeeklyCaloriesButton = this.weeklyPlannerSection.getByRole('button', { name: 'Calculate Weekly Calories' });
    this.clearPlannerButton = this.weeklyPlannerSection.getByRole('button', { name: 'Clear Planner' });
    this.addRandomMealsButton = this.weeklyPlannerSection.getByRole('button', { name: 'Add Random Meals (Demo)' });
    this.totalWeeklyCaloriesText = this.weeklyPlannerSection.locator('p, div').filter({ hasText: 'Total Weekly Calories:' }).first();
    this.averageDailyCaloriesText = this.weeklyPlannerSection.locator('p, div').filter({ hasText: 'Average Daily Calories:' }).first();

    this.mealSelectionSection = this.plannerContainer.locator('.meal-selection');
  }

  async open() {
    await super.open('/pages/planner.php');
  }

  async verifyPageLoaded() {
    await this.verifyUrl('/pages/planner.php');
    await expect(this.page).toHaveTitle('Burger Shop - Menu Planner');
    await expect(this.pageHeading).toBeVisible();
  }

  async calculateCalorieNeeds({ currentWeight, targetWeight, height, speed, age, gender, activityLevel }) {
    if (currentWeight) await this.currentWeightInput.fill(String(currentWeight));
    if (targetWeight) await this.targetWeightInput.fill(String(targetWeight));
    if (height) await this.heightInput.fill(String(height));
    if (speed) await this.weightLossSpeedInput.fill(String(speed));
    if (age) await this.ageInput.fill(String(age));
    if (gender) await this.genderSelect.selectOption({ label: gender });
    if (activityLevel) await this.activityLevelSelect.selectOption({ label: activityLevel });
    await this.calculateNeedsButton.click();
  }


  getDayCard(dayName) {
    return this.weeklyPlannerSection.locator('.card, div').filter({ hasText: dayName }).first();
  }

  async addMealToPlanner(mealName) {
    const mealCard = this.mealSelectionSection
      .locator('.card, div')
      .filter({ has: this.page.getByRole('heading', { name: mealName, exact: true }) })
      .first();
    await mealCard.getByRole('button', { name: 'Add to Planner' }).click();
  }

  async addRandomMeals() {
    await this.addRandomMealsButton.click();
  }

  async calculateWeeklyCalories() {
    await this.calculateWeeklyCaloriesButton.click();
  }

  async clearPlanner() {
    await this.clearPlannerButton.click();
  }
}