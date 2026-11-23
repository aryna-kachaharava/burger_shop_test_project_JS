import { expect } from '@playwright/test';

export class OrderModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#order-frame');
    this.closeButton = this.modal.getByText('×');
    this.title = this.modal.getByRole('heading', { name: 'Complete Your Order' });

    this.nameInput = this.modal.getByLabel('Name');
    this.phoneInput = this.modal.getByLabel('Phone');
    this.addressInput = this.modal.getByLabel('Address');
    this.specialInstructionsInput = this.modal.getByLabel('Special Instructions');


    this.cashOnDeliveryRadio = this.modal.getByLabel('Cash on Delivery');
    this.creditCardRadio = this.modal.getByLabel('Credit Card');

    this.placeOrderButton = this.modal.getByRole('button', { name: 'Place Order' });
  }

  async verifyVisible() {
    await expect(this.modal).toBeVisible();
    await expect(this.title).toBeVisible();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.modal).toBeHidden();
  }


  async fillOrderDetails({ name, phone, address, instructions, paymentMethod = 'Cash on Delivery' }) {
    if (name !== undefined) await this.nameInput.fill(name);
    if (phone !== undefined) await this.phoneInput.fill(phone);
    if (address !== undefined) await this.addressInput.fill(address);
    if (instructions !== undefined) await this.specialInstructionsInput.fill(instructions);

    if (paymentMethod === 'Credit Card') {
      await this.creditCardRadio.check();
    } else {
      await this.cashOnDeliveryRadio.check();
    }
  }


  async submitOrder(orderData) {
    await this.verifyVisible();
    await this.fillOrderDetails(orderData);
    await this.placeOrderButton.click();
  }

  async verifyFieldRequiredValidation(inputLocator) {
    const validationMessage = await inputLocator.evaluate((el) => el.validationMessage);
    expect(validationMessage).not.toBe('');
  }
}