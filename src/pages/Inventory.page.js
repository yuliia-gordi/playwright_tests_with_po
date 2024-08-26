import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    dropdown = this.page.locator('.product_sort_container');

    options = this.dropdown.locator('option');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async getItemsData() {
        const data = [];
        const allItems = await this.inventoryItems.all();
        
        for (const item of allItems) {
            data.push({
                name: await item.locator('.inventory_item_name').textContent(),
                desc: await item.locator('.inventory_item_desc').textContent(),
                price: parseFloat((await item.locator('.inventory_item_price').textContent()).replace('$', ''))
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
}
