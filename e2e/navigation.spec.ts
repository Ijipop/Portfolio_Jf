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
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByText(/obtenir une estimation|get an estimate/i).first()
  ).toBeVisible()
  await expect(page.getByTestId('graphics-background-layer')).toHaveAttribute('data-graphics-mode', /light|beige-dark/)
  await expect(page.getByTestId('vanta-background')).toHaveCount(0)

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
  await expect(form.locator('button[type="submit"]')).toContainText(/Obtenir une estimation|Get an estimate/i)
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

test('logiciel and SEO landing routes are reachable', async ({ page }) => {
  await page.goto('/logiciel', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/logiciel/)

  await page.goto('/creation-site-web-montreal', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/creation-site-web-montreal/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Montréal et partout au Québec/)

  await page.goto('/portfolio/pageweb', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/creation-site-web-montreal/)
})

test('demos index and demo routes', async ({ page }) => {
  await page.goto('/demos', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/demos\/?$/)
  await expect(page.locator('h1').first()).toContainText(/Huit directions créatives/)
  await expect(page.locator('a[href="/demos/studio"]').first()).toBeVisible()
  await expect(page.locator('a[href="/demos/spectacle"]').first()).toBeVisible()
  await expect(page.getByTestId('demos-grid-ready')).toBeVisible()

  const constructionLink = page.getByTestId('demo-link-construction')
  await constructionLink.scrollIntoViewIfNeeded()
  await Promise.all([
    page.waitForURL(/\/demos\/construction/),
    constructionLink.click(),
  ])
  await expect(page.locator('h1').filter({ hasText: /On bâtit solide/ })).toBeVisible()

  await page.goto('/demos/studio', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1').filter({ hasText: /sans formule toute faite/ })).toBeVisible()

  await page.goto('/demos/spectacle', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1').filter({ hasText: /Une scène pour les voix/ })).toBeVisible()

  await page.goto('/demos/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1').filter({ hasText: /pensés pour convertir/ })).toBeVisible()
  await expect(page.getByText('Jean-François Lefebvre')).toBeVisible()

  await page.goto('/demos/galerie', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('link', { name: 'Ligne claire' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Maison Nord/ })).toBeVisible()
})

