import { expect, test } from '@playwright/test'

/**
 * Smoke bilinguisme — nécessite NEXT_PUBLIC_I18N_TOGGLE_ENABLED=true
 * au démarrage du serveur Next (dev ou build). Skip sinon.
 */
test.describe('i18n flag-on smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-locale', 'en'))
  })

  test('toggle visible et accueil EN quand flag on', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 120_000 })
    const toggle = page.getByTestId('pv2-locale-toggle')
    const flagOn = await toggle.isVisible().catch(() => false)
    test.skip(!flagOn, 'Flag i18n off — smoke EN local uniquement')

    await expect(toggle).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Websites|software|IT support/i)
    await expect(page.getByRole('banner').getByRole('link', { name: 'Work' })).toBeVisible()
    await page.getByRole('banner').getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/a-propos/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/About/i)
  })
})
