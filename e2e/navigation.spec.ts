import { expect, test } from '@playwright/test'

test('landing reaches portfolio and contact in two clicks max', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await expect(page.getByRole('contentinfo')).toBeVisible()
  await expect(page.locator('a[href="/portfolio/projets"]').first()).toBeVisible()
  await expect(page.locator('a[href="/portfolio/contact"]').first()).toBeVisible()

  await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })

  await expect(page).toHaveURL(/\/portfolio\/contact/)
  await expect(page.getByTestId('contact-form')).toBeVisible()
})

test('portfolio home loads and nav works', async ({ page }) => {
  // Mode présentation « dev » : sinon défaut beige → fond statique, pas Vanta (voir PresentationModeContext)
  await page.addInitScript(() => {
    window.localStorage.setItem('presentationMode', 'dev')
  })

  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByText(/obtenir une estimation rapide|let's discuss your project/i).first()
  ).toBeVisible()
  await expect(page.getByTestId('graphics-background-layer')).toHaveAttribute('data-graphics-mode', 'full')
  // Créa + graphismes complets : Vanta NET (`vanta-background`).
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

  await expect(page.getByRole('contentinfo')).toBeVisible()

  const form = page.getByTestId('contact-form')

  await expect(form.locator('input[name="name"]')).toBeVisible()
  await expect(form.locator('input[name="email"]')).toBeVisible()
  await expect(form.locator('input[name="subject"]')).toBeVisible()
  await expect(form.locator('textarea[name="message"]')).toBeVisible()
})

test('light graphics mode can be forced for fallback validation', async ({ page }) => {
  // Reduced-motion + graphismes forcés « light » : pas de Vanta, calque gradient (data-graphics-mode light).
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    window.localStorage.setItem('presentationMode', 'dev')
    window.localStorage.setItem('portfolio-force-graphics-mode', 'light')
  })

  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })

  await expect(page.getByTestId('graphics-background-layer')).toHaveAttribute('data-graphics-mode', 'light')
  await expect(page.getByTestId('vanta-background')).toHaveCount(0)
})

test('logiciel and pageweb routes are reachable', async ({ page }) => {
  await page.goto('/logiciel', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/logiciel/)

  await page.goto('/portfolio/pageweb', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/pageweb/)
})

test('demos index and demo routes', async ({ page }) => {
  await page.goto('/demos', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/demos\/?$/)
  await expect(page.locator('h1').first()).toContainText(/Six directions créatives/)
  await expect(page.locator('a[href="/demos/studio"]').first()).toBeVisible()
  await expect(page.locator('a[href="/demos/spectacle"]').first()).toBeVisible()

  await page.getByTestId('demo-link-construction').click()
  await expect(page).toHaveURL(/\/demos\/construction/)
  await expect(page.locator('h1').filter({ hasText: /On bâtit solide/ })).toBeVisible()

  await page.goto('/demos/studio', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1').filter({ hasText: /sans formule toute faite/ })).toBeVisible()

  await page.goto('/demos/spectacle', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1').filter({ hasText: /Une scène pour les voix/ })).toBeVisible()
})

