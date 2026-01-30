import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page title contains RESQIO
    await expect(page).toHaveTitle(/RESQIO/);

    // Check that the hero section is visible
    await expect(page.getByRole('heading', { name: /Einsatzbereit.*Geprüft.*Professionell/i })).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check that navigation links are present
    await expect(page.getByRole('link', { name: /funktionen/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /angebot anfragen/i })).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');

    // Scroll to features section
    await page.locator('#funktionen').scrollIntoViewIfNeeded();

    // Check that features are displayed
    await expect(page.getByRole('heading', { name: /Dashboard & Übersicht/i })).toBeVisible();
  });

  test('mobile: should have functional hamburger menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that mobile menu button is visible
    const menuButton = page.getByRole('button', { name: /menü öffnen/i });
    await expect(menuButton).toBeVisible();

    // Click to open menu
    await menuButton.click();

    // Check that mobile navigation is visible
    await expect(page.getByRole('button', { name: /menü schließen/i })).toBeVisible();
  });

  test('mobile: carousel should have navigation buttons', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Scroll to software showcase
    await page.locator('#software-showcase').scrollIntoViewIfNeeded();

    // Check that mobile carousel buttons are visible
    await expect(page.getByLabel(/vorheriges bild/i)).toBeVisible();
    await expect(page.getByLabel(/nächstes bild/i)).toBeVisible();
  });

  test('should navigate to module detail page', async ({ page }) => {
    await page.goto('/');

    // Click on a module card
    await page.getByRole('link', { name: /lagemonitor/i }).first().click();

    // Check that we're on the module detail page
    await expect(page).toHaveURL(/\/modul\//);
    await expect(page.getByRole('heading', { name: /lagemonitor/i })).toBeVisible();
  });

  test('accessibility: should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check for proper ARIA labels
    await expect(page.locator('[aria-label]')).toHaveCount(expect.any(Number));

    // Check carousel has aria-live
    const carousel = page.locator('[aria-live="polite"]');
    await expect(carousel).toBeVisible();
  });
});
