import { expect, test } from '@playwright/test'

test('landing reaches portfolio and contact in two clicks max', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  // Home is at `/`; Footer is a Box (no <footer> tag), so target links directly
  await expect(page.locator('a[href="/portfolio/projets"]').first()).toBeVisible()
  await expect(page.locator('a[href="/portfolio/contact"]').first()).toBeVisible()

  await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })

  await expect(page).toHaveURL(/\/portfolio\/contact/)
  await expect(page.getByTestId('contact-form')).toBeVisible()
})

test('portfolio home loads and nav works', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByText(/discutons de votre projet|let's discuss your project/i).first()
  ).toBeVisible()
  await expect(page.getByTestId('graphics-background-layer')).toHaveAttribute('data-graphics-mode', 'full')
  await expect(page.getByTestId('vanta-background')).toBeVisible()

  await expect(page.locator('a[href="/portfolio/projets"]').first()).toBeVisible()
  await expect(page.locator('a[href="/portfolio/contact"]').first()).toBeVisible()

  await page.goto('/portfolio/projets', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/projets/)

  await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/contact/)
})

test('about cards can flip without breaking layout', async ({ page }) => {
  await page.goto('/portfolio/a-propos', { waitUntil: 'domcontentloaded' })

  await page.getByTestId('about-flip-card-who').click()
  await expect(page.getByRole('heading', { name: 'Jean-François Lefebvre' })).toBeVisible()

  await page.getByTestId('about-flip-card-formation').click()
  await expect(page.getByText(/AEC Développement de logiciels/i)).toBeVisible()
})

test('contact form renders stable fields', async ({ page }) => {
  await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })

  const form = page.getByTestId('contact-form')

  await expect(form.locator('input[name="name"]')).toBeVisible()
  await expect(form.locator('input[name="email"]')).toBeVisible()
  await expect(form.locator('input[name="subject"]')).toBeVisible()
  await expect(form.locator('textarea[name="message"]')).toBeVisible()
})

test('light graphics mode can be forced for fallback validation', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('portfolio-force-graphics-mode', 'light')
  })

  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })

  await expect(page.getByTestId('graphics-background-layer')).toHaveAttribute('data-graphics-mode', 'light')
  await expect(page.getByTestId('vanta-background')).toHaveCount(0)
})

test('logiciel and pageweb routes are reachable', async ({ page }) => {
  await page.goto('/logiciel', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/logiciel/)

  await page.goto('/pageweb', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/pageweb/)
})

