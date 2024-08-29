import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { dropdownOptions } from '../../utils/get_sorted_function';
import { users } from '../test_data/users';

const { username, password } = users.standardUser;

test.describe('Check sorting', () => {
    let initialData;

    // Setup before any tests run
    test.beforeEach(async ({ app }) => {
        // 'Open main page'
        await test.step('Open main page', async () => {
            await app.login.navigate();
        });

        // 'Login as a standard user'
        await test.step('Login as a standard user', async () => {
            await app.login.performLogin(username, password);
        });

        // 'Get initial data for sorting'
        initialData = await test.step('Get initial data for sorting', async () => {
            return await app.inventory.getItemsData();
        });

        await test.step('Check items count', async () => {
            const items = await app.inventory.getItemsData();
            expect(items.length).toBeGreaterThan(1);
        })

        // 'Get all sort option values'
        await test.step('Check sort options count', async () => {
            const options = await app.inventory.getOptionValues();
            expect(options).toHaveLength(4);
        })
    });

    // 'Compare actual and expected data'
    Object.entries(dropdownOptions).forEach(([value, comparator]) => {
        test(`Check sorting for option ${value}`, async (
            /** @type {{ app: import('../pages/Application').Application }} */{ app },
        ) => {
            //select option
            await expect(await app.inventory.getOptionByValue(value)).toHaveCount(1);

            await app.inventory.dropdownSelect(value);
            const actualResult = await app.inventory.getItemsData();

            //sort initialData
            const expectedResult = initialData.sort(comparator);

            //compare 
            expect(actualResult).toStrictEqual(expectedResult);
        })
    })
});