import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

const getItemsData = async (items) => {
    const data = [];

    for (const item of items) {
        data.push({
            name: await item.locator('.inventory_item_name').textContent(),
            desc: await item.locator('.inventory_item_desc').textContent(),
            price: parseFloat((await item.locator('.inventory_item_price').textContent()).replace('$', ''))
        })
    };
    return data;
}

const getSortFunction = (value) => {
    switch(value) {
        case 'az':
            return (item1, item2) => item1.name.localeCompare(item2.name);
        case 'za':
            return (item1, item2) => item2.name.localeCompare(item1.name);
        case 'lohi':
            return (item1, item2) => item1.price - item2.price;
        case 'hilo':
            return (item1, item2) => item2.price - item1.price;
        default:
            throw new Error(`Unknown sort value: ${value}`);
    }
}

test.describe('Check sorting', () => {
    test('', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
    
        const inventoryItems = await app.inventory.inventoryItems.all();
        const initialData = await getItemsData(inventoryItems);

        const dropdown = app.page.locator('.product_sort_container');
       
        //sort options
        const optionElements = (await dropdown.locator('option').all())

        for (let option of optionElements) {
            const value = await option.getAttribute('value')
            const sortedFunction = getSortFunction(value);

            //select option
            await dropdown.selectOption(value);
            const currentData = await getItemsData(inventoryItems);
            
            //sort copy of initialData
            const sortedData = [...initialData].map(d => d).sort(sortedFunction);

            //compare 
            expect(currentData).toStrictEqual(sortedData);
        }
    })
});