import { test, expect } from '@playwright/test';

/**
 * Die Sections unterhalb des Heroes werden lazy geladen und existieren erst im
 * DOM, wenn sie in den Viewport kommen. `scrollIntoViewIfNeeded()` auf ihre ID
 * konnte deshalb nie funktionieren – das Element gibt es zu dem Zeitpunkt noch
 * nicht. Stattdessen wird schrittweise gescrollt, bis das Ziel auftaucht.
 */
async function revealSection(page: import('@playwright/test').Page, id: string) {
  const target = page.locator(`#${id}`);
  const step = (page.viewportSize()?.height ?? 800) * 0.9;
  // Auf schmalen Viewports ist die Seite deutlich höher, entsprechend mehr Schritte.
  for (let i = 0; i < 60; i++) {
    if (await target.count()) {
      await target.scrollIntoViewIfNeeded();
      return;
    }
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(150);
  }
  throw new Error(`Section #${id} ist auch nach dem Scrollen nicht erschienen`);
}

/** Öffnet auf schmalen Viewports das Hamburger-Menü, damit die Navigation sichtbar ist. */
async function openNavIfMobile(page: import('@playwright/test').Page) {
  const menuButton = page.getByRole('button', { name: /menü öffnen/i });
  if (await menuButton.isVisible()) await menuButton.click();
}

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/RESQIO/);
    await expect(
      page.getByRole('heading', { name: /Einsatzbereit.*Geprüft.*Professionell/i })
    ).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    await openNavIfMobile(page);

    // Die Navigation besteht aus echten Links (vorher <button>): so sind die
    // Ziele crawlbar und lassen sich im neuen Tab öffnen.
    await expect(page.getByRole('link', { name: /funktionen/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /angebot anfragen/i }).first()).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    await revealSection(page, 'funktionen');

    await expect(
      page.getByRole('heading', { name: /Dashboard & Übersicht/i })
    ).toBeVisible();
  });

  test('every module card links to a module page', async ({ page }) => {
    await page.goto('/');
    await revealSection(page, 'funktionen');

    // Kein Kartenlink darf auf /modul/kreis-platform zeigen – die URL wird per
    // 301 auf /kreis umgeleitet, ein interner Link darauf verschenkt Crawl-Budget.
    await expect(page.locator('a[href="/modul/kreis-platform"]')).toHaveCount(0);
    // Die Wasserkarte war lange das einzige Modul ohne Einstieg von der Startseite.
    await expect(page.locator('a[href="/modul/wasserkarte"]')).toHaveCount(1);
  });

  test('mobile: should have functional hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menü öffnen/i });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(page.getByRole('button', { name: /menü schließen/i })).toBeVisible();
  });

  test('mobile: carousel should have navigation buttons', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await revealSection(page, 'software-showcase');

    await expect(page.getByLabel(/vorheriges bild/i)).toBeVisible();
    await expect(page.getByLabel(/nächstes bild/i)).toBeVisible();
  });

  test('should navigate to module detail page', async ({ page }) => {
    await page.goto('/');
    await revealSection(page, 'funktionen');

    await page.getByRole('link', { name: /lagemonitor/i }).first().click();

    await expect(page).toHaveURL(/\/modul\//);
    await expect(page.getByRole('heading', { name: /lagemonitor/i }).first()).toBeVisible();
  });

  test('accessibility: skip link is the first tab stop', async ({ page }) => {
    await page.goto('/');

    // Der Skip-Link wird erst bei Tastaturfokus sichtbar und muss der erste
    // Tabstopp sein – sonst führt der Weg zum Inhalt durch die ganze Navigation.
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /zum hauptinhalt/i });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute('href', '#hauptinhalt');
    await expect(page.locator('#hauptinhalt')).toHaveCount(1);
  });

  test('FAQ schema matches the visible questions', async ({ page }) => {
    await page.goto('/');
    await revealSection(page, 'faq');

    // Jede im FAQPage-Schema ausgezeichnete Frage muss auf der Seite sichtbar
    // sein – sonst verstößt die Auszeichnung gegen Googles FAQ-Richtlinie.
    const schema = await page.locator('#homepage-faq-jsonld').textContent();
    const questions: string[] = JSON.parse(schema!).mainEntity.map(
      (entry: { name: string }) => entry.name
    );
    expect(questions.length).toBeGreaterThan(0);

    for (const question of questions) {
      await expect(page.getByRole('button', { name: question, exact: true })).toBeVisible();
    }
  });
});
