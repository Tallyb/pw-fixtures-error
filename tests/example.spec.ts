import { test, expect } from '@playwright/test';

test('has title', async ({ page  }) => {
  // await useFakeTime('2020-01-01T00:00:00Z');
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.waitForSelector('not-exist', {timeout: 90000});
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
