import {test} from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200');
});

test('title first test', async ({page}) => {
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test('nagigate', async ({page}) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();
});

test.describe('ケース１', () => {
  test.beforeEach(async({page}) => {
    await page.getByText('Forms').click();
  });
  
  test('title first test', async ({page}) => {
    await page.getByText('Form Layouts').click();
  });
  
  test('nagigate', async ({page}) => {
    await page.getByText('Datepicker').click();
  });
});

test.describe('ケース2', () => {
  test.beforeEach(async({page}) => {
 
    await page.getByText('Forms').click();
  })
  
  test('title first test', async ({page}) => {
    await page.getByText('Form Layouts').click();
  });
  
  test('nagigate', async ({page}) => {
    await page.getByText('Datepicker').click();
  })
});
