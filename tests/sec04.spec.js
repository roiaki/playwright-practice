import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200');
  await page.getByText('Forms').click();
  await page.getByText('Form Layout').click();
});

test('Locate', async({page}) => {
  page.locator('input');

  await page.locator('#inputEmail1').fill('test');

  page.locator('.shape-rectangle')

  page.locator('[placeholder="Email"]');
});

test('User facing locater', async({page}) => {
  await page.getByRole('textbox', {name: "Email"}).first().click();
  await page.getByRole('button', {name: "Sign in"}).first().click();
  await page.getByLabel('Email').first().click();
  await page.getByPlaceholder('Jane Doe').click();
  await page.getByText('Using the Grid').click();
  await page.getByTestId('SignIn').click();
  await page.getByTitle('IoT Dashboard').click();
});

test('子要素', async({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();

  await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('親要素', async({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Email"}).click();

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click();
});

test('test3', async({page}) => {
  const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"});
  const emailField = basicForm.getByRole('textbox', {name: "Email"});

  await emailField.fill('test@test.com');
  await basicForm.getByRole('textbox', {name: "Password"}).fill('testtest123');
  await basicForm.locator('nb-checkbox').click();
  await basicForm.getByRole('button').click();

  await expect(emailField).toHaveValue('test@test.com');
});

test('chap29', async({page}) => {
  const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"});
  const buttonText = await basicForm.locator('button').textContent();

  expect(buttonText).toEqual('Submit');

  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioButtonLabels).toContain("Option 1");

  const emailField = basicForm.getByRole('textbox', {name: "Email"});
  await emailField.fill('test@test.com');

  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@test.com');

  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Email');

});

test('chap30', async({page}) => {
  const basicFormButton =  page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');

  // Genreral assertions
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  // locator assertion
  await expect(basicFormButton).toHaveText('Submit');

  // Soft assertion expect.soft
  await expect(basicFormButton).toHaveText('Submit');
  await basicFormButton.click();

});
  

