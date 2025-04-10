import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://conduit.bondaracademy.com/");
});

// Working with APIs
test("chap54", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
});
