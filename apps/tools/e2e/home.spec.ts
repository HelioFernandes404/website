import { expect, test } from '@playwright/test';

test('home renders hero and navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Discover developer tools');
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
});

test('category tabs target sections', async ({ page }) => {
  await page.goto('/');

  const tab = page.getByRole('link', { name: '01 AI Assistants' });
  await expect(tab).toHaveAttribute('href', '#ai-assistants');
  await tab.click();

  await expect(page.locator('#ai-assistants')).toBeVisible();
});

test('view all navigates to category placeholder', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'View all' }).first().click();

  await expect(page.getByText('Coming Soon.')).toBeVisible();
});
