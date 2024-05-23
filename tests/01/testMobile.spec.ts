import {test, expect} from '@playwright/test';

test('chap33', async({page}, testInfo) => {

  await page.goto('http://localhost:4200');
  if(testInfo.project.name == 'mobile') {
    await page.locator('.sidebar-toggle').click();
  }
  await page.getByText('Forms').click();
  await page.getByText('Form Layout').click();
  if(testInfo.project.name == 'mobile') {
    await page.locator('.sidebar-toggle').click();
  }
  const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});
  await usingTheGridEmailInput.fill('test@test.com');
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially('test2@test.com');
});