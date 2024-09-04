import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.getByTestId('title');

    inventoryItems = this.page.getByTestId('inventory-item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    dropdown = this.page.getByTestId('product-sort-container');

    options = this.dropdown.locator('option');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async getItemsData() {
        const data = [];
        const allItems = await this.inventoryItems.all();
        
        for (const item of allItems) {
            data.push({
                name: await item.getByTestId('inventory-item-name').textContent(),
                desc: await item.getByTestId('inventory-item-desc').textContent(),
                price: parseFloat((await item.getByTestId('inventory-item-price').textContent()).replace('$', ''))
            })
        };
        return data;
    }

    async getOptionValues() {
        const values = [];
        const options = await this.options.all();
        for (const option of options) { 
            values.push(await option.getAttribute('value'))
        }
        return values;
    }

    async getOptionByValue(value) {
        return this.dropdown.locator(`option[value="${value}"]`);
    }

    async dropdownSelect(value) {
        await this.dropdown.selectOption(value)
    }
}
