import {test, expect} from '@playwright/test';

test.describe('Form Layouts page', () => {
  test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200');
    await page.getByText('Forms').click();
    await page.getByText('Form Layout').click();
  });

  test('chap33', async({page}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});

    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    // 一文字ずつ入力する
    await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500});

    // generic assertion
    // await page.waitForTimeout(1000);
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('test2@test.com');

    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
  });
  
  test('chap34 ラジオボタン', async({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

    //await usingTheGridForm.getByLabel('Option 1').check({force: true});
    // Option 1
    await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true});
    const radioStatus1 = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked();
    expect(radioStatus1).toBeTruthy();
    await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked();

    // Option 2
    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true});

    // getByRoleが推奨
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy();

    const radioStatus2 = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked();
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();
    // なぜかTrueになってエラー
    //await expect(radioStatus1).toBeFalsy();
    expect(radioStatus2).toBeTruthy();
    //await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked();
  });
  
  test('chap35 CheckBox', async({page}) => {
    await page.goto('http://localhost:4200');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true});
  });


});


