import { expect, test, type Page } from '@playwright/test'

const ROUTE = '/soutien-informatique-montreal'
const FORM_ID = 'demande-soutien'

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '390', width: 390, height: 844 },
  { name: '320', width: 320, height: 800 },
] as const

function supportForm(page: Page) {
  return page.getByTestId('support-contact-form')
}

async function gotoSupport(page: Page) {
  await page.goto(ROUTE, { waitUntil: 'domcontentloaded', timeout: 120_000 })
  await page.locator(`#${FORM_ID}`).scrollIntoViewIfNeeded()
  await expect(supportForm(page)).toBeVisible({ timeout: 60_000 })
  await waitFormInteractive(page)
}

async function waitFormInteractive(page: Page) {
  await expect(supportForm(page)).toHaveAttribute('data-form-ready', 'true', { timeout: 60_000 })
  const submit = supportForm(page).getByRole('button', { name: 'Envoyer la demande' })
  await expect(submit).toBeVisible()
  await expect(submit).toBeEnabled()
}

async function fillValidSupportForm(page: Page) {
  const form = supportForm(page)
  await form.locator('input[name="name"]').fill('Test P0 IJIPOP')
  await form.locator('input[name="email"]').fill('test.p0@example.invalid')
  await form.locator('input[name="phone"]').fill('514-555-0199')
  await form.getByRole('radio', { name: 'Dépannage ou mise en place' }).check()
  await form.getByRole('radio', { name: 'À distance' }).check()
  await form
    .locator('textarea[name="message"]')
    .fill('TEST P0 automatise — message suffisamment long.')
}

async function submitForm(page: Page) {
  await waitFormInteractive(page)
  await supportForm(page).getByRole('button', { name: 'Envoyer la demande' }).click()
}

for (const vp of VIEWPORTS) {
  test.describe(`support form P0 @ ${vp.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
    })

    test('flag off : formulaire FR malgré portfolio-locale=en (chrome fixedLocale)', async ({
      page,
    }) => {
      // NEXT_PUBLIC_I18N_TOGGLE_ENABLED unset/false en CI → PublicChromeI18n verrouille FR.
      // Le formulaire hérite du provider chrome (pas d’îlot LanguageProvider imbriqué).
      await page.addInitScript(() => localStorage.setItem('portfolio-locale', 'en'))
      await gotoSupport(page)
      await expect(page.getByRole('heading', { name: 'Décrivez votre problème' })).toBeVisible()
      await expect(supportForm(page).getByRole('button', { name: 'Envoyer la demande' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Send request' })).toHaveCount(0)
    })

    test('validation visible et focus premier champ', async ({ page }) => {
      await gotoSupport(page)
      const posts: string[] = []
      page.on('request', (req) => {
        if (req.url().includes('/api/contact') && req.method() === 'POST') posts.push(req.url())
      })
      await submitForm(page)
      await expect(page.getByText(/Veuillez corriger les champs/i)).toBeVisible()
      expect(posts).toHaveLength(0)
      await expect(supportForm(page).getByRole('textbox', { name: 'Nom', exact: true })).toBeFocused()
    })

    test('succès API simulé', async ({ page }) => {
      await page.route('**/api/contact', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      })
      await gotoSupport(page)
      await fillValidSupportForm(page)
      await Promise.all([
        page.waitForResponse((r) => r.url().includes('/api/contact') && r.status() === 200),
        submitForm(page),
      ])
      await expect(page.getByText(/bien été envoyée/i)).toBeVisible({ timeout: 20_000 })
    })

    test('échec API simulé et réessai', async ({ page }) => {
      let calls = 0
      await page.route('**/api/contact', async (route) => {
        calls += 1
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ success: false, error: 'Erreur simulée P0' }),
        })
      })
      await gotoSupport(page)
      await fillValidSupportForm(page)
      await submitForm(page)
      await expect(page.getByText(/Erreur simulée P0/i)).toBeVisible()
      expect(calls).toBe(1)
      await expect(supportForm(page).getByRole('button', { name: 'Envoyer la demande' })).toBeEnabled()
      await expect(supportForm(page).getByRole('textbox', { name: 'Nom', exact: true })).toHaveValue(
        'Test P0 IJIPOP',
      )
    })

    test('sticky masquée près du formulaire', async ({ page }) => {
      test.skip(vp.width >= 900, 'sticky mobile only')
      await gotoSupport(page)
      await expect(page.getByTestId('support-mobile-sticky-cta')).toHaveAttribute(
        'data-sticky-hidden',
        'true',
      )
    })

    test('pas de débordement horizontal', async ({ page }) => {
      await gotoSupport(page)
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      )
      expect(hasOverflow).toBe(false)
    })
  })
}