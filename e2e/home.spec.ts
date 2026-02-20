import { expect, test } from '@playwright/test';

test('home renders hero and navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Discover developer tools');
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
});

test('category tabs target sections', async ({ page }) => {
  await page.goto('/');

  const tab = page.getByRole('link', { name: '01 Vibe Coding' });
  await expect(tab).toHaveAttribute('href', '#vibe-coding');
  await tab.click();

  await expect(page.locator('#vibe-coding')).toBeVisible();
});

test('view all navigates to category placeholder', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'View all' }).first().click();

  await expect(page.getByText('Coming Soon.')).toBeVisible();
});
