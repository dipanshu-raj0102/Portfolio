import { expect, test } from '@playwright/test';

test('visitor can browse a featured project', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /I build ML systems/i })).toBeVisible();
  await page.getByRole('link', { name: /Open Neural Network \(MLP\) From Scratch/i }).click();
  await expect(page).toHaveURL(/\/projects\/neural-network-from-scratch$/);
  await expect(page.getByRole('heading', { name: /Neural Network \(MLP\) From Scratch/i })).toBeVisible();
});

test('visitor can submit the contact form through the API', async ({ page }) => {
  await page.goto('/#contact');
  await page.getByLabel('Name').fill('E2E Visitor');
  await page.getByLabel('Email').fill('e2e@example.com');
  await page.getByLabel('Subject').fill('A useful systems question');
  await page.getByLabel('Message').fill('This submission verifies the contact flow from browser to API persistence.');
  await page.getByRole('button', { name: /send message/i }).click();
  await expect(page.getByText(/Message received/i)).toBeVisible();
});
