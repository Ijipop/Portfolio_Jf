import { expect, test } from '@playwright/test'

const MOBILE_ROUTES = [
  '/',
  '/portfolio',
  '/portfolio/projets',
  '/portfolio/a-propos',
  '/portfolio/contact',
  '/creation-site-web-montreal',
  '/soutien-informatique-montreal',
  '/logiciel/timelendr',
] as const

const OVERFLOW_VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
] as const

test.describe('mobile baseline', () => {
  for (const viewport of OVERFLOW_VIEWPORTS) {
    for (const route of MOBILE_ROUTES) {
      test(`no horizontal overflow on ${route} @ ${viewport.width}x${viewport.height}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport)
        await page.goto(route, { waitUntil: 'domcontentloaded' })

        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth + 1
        })

        expect(hasOverflow).toBe(false)
      })
    }
  }

  test('contact form is fully usable on mobile', async ({ page }) => {
    await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })

    const form = page.getByTestId('contact-form')
    await expect(form).toBeVisible()
    await expect(form.locator('input[name="name"]')).toBeVisible()
    await expect(form.locator('input[name="email"]')).toBeVisible()
    await expect(form.locator('textarea[name="message"]')).toBeVisible()
    await expect(form.locator('button[type="submit"]')).toBeVisible()
  })
})
