import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { getSortFunction } from '../../utils/get_sorted_function';
import { users } from '../test_data/users';

const { username, password } = users.standardUser;

test.describe('Check sorting', () => {
    test('Check sorting on InventoryPage', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // 'Open main page'
        await test.step('Open main page', async () => {
            await app.login.navigate();
        });

        // 'Login as a standard user'
        await test.step('Login as a standard user', async () => {
            await app.login.performLogin(username, password);
        });
    
        // 'Get initial data for sorting'
        const initialData = await test.step('Get initial data for sorting', async () => {
            return await app.inventory.getItemsData();
        });
       
        // 'Get all sort option values'
        const optionValues = await test.step('Get all sort option values', async () => {
            return await app.inventory.getOptionValues()
        });

        // 'Compare actual and expected data'
        await test.step('Compare actual and expected data', async () => {
            for (let value of optionValues) {
                //select option
                await app.inventory.dropdown.selectOption(value);
                const actualResult = await app.inventory.getItemsData();
                
                //sort initialData
                const expectedResult = [...initialData].sort(getSortFunction(value));

                //compare 
                expect(actualResult).toStrictEqual(expectedResult);
            }
        })
    })
});