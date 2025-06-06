import { test, expect } from '@playwright/test';
import tags from '../../test-data/tags.json';


test.beforeEach(async ({ page }) => {
  await page.route('https://conduit-api.bondaracademy.com/api/tags', async route => {
    // const tags = {
    //   "tags": [
    //     "automation",
    //     "playwright",
    //   ]
    // }
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  console.log(tags);
  await page.waitForTimeout(1000);
  await page.goto('https://conduit.bondaracademy.com/');
});

test('has title', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await page.waitForTimeout(500);
  
});
