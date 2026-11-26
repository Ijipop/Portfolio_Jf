import { expect, test, type Page } from '@playwright/test'

/** Immediate retry on aborted navigations (Next/Playwright race); no sleep. */
async function gotoStable(page: Page, url: string) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!/ERR_ABORTED/.test(message)) throw error
    await page.goto(url, { waitUntil: 'domcontentloaded' })
  }
}

test('landing reaches portfolio and contact in two clicks max', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  // Pop Atelier home (V2) : hero + trois services — plus de gateway V1.
  await expect(page.getByTestId('pv2-hero')).toBeVisible()
  await expect(page.getByTestId('pv2-services')).toBeVisible()
  await expect(page.getByTestId('pv2-service-web')).toBeVisible()
  await expect(page.getByTestId('pv2-service-support')).toBeVisible()
  await expect(page.getByTestId('pv2-service-software')).toBeVisible()

  await page.getByTestId('pv2-service-web').getByRole('link').click()
  await expect(page).toHaveURL(/\/portfolio\/projets/)

  const contactCta = page.getByRole('banner').getByRole('link', { name: 'Me contacter' })
  await expect(contactCta).toBeVisible()
  await Promise.all([
    page.waitForURL(/\/portfolio\/contact/),
    contactCta.click(),
  ])
  await expect(page.getByTestId('contact-form')).toBeVisible()
})

test('portfolio home loads and nav works', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByText(/obtenir une estimation|get an estimate/i).first()
  ).toBeVisible()
  // Funnel /portfolio : HomeV2Backdrop CSS (pas de topology / Vanta).
  await expect(page.getByTestId('home-v2-backdrop')).toBeVisible()
  await expect(page.getByTestId('graphics-background-layer')).toHaveCount(0)
  await expect(page.getByTestId('vanta-background')).toHaveCount(0)

  await expect(page.locator('a[href="/portfolio/projets"]').first()).toBeVisible()
  await expect(page.locator('a[href="/portfolio/contact"]').first()).toBeVisible()

  await page.goto('/portfolio/projets', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/projets/)

  await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/contact/)
})

test('about page presents identity and formation', async ({ page }) => {
  // V2 À propos : portrait + formation en sections (plus de cartes flip V1).
  await page.goto('/portfolio/a-propos', { waitUntil: 'domcontentloaded' })

  await expect(page.getByRole('heading', { name: 'Jean-François Lefebvre' })).toBeVisible()
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
  // Contact V2 : libellé éditorial « Envoyer mon message » (pas le CTA estimation funnel).
  await expect(form.locator('button[type="submit"]')).toContainText(/Envoyer mon message|Send my message/i)
})

test('portfolio home has CSS backdrop and no Vanta (reduced motion)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })

  await expect(page.getByTestId('home-v2-backdrop')).toBeVisible()
  await expect(page.getByTestId('graphics-background-layer')).toHaveCount(0)
  await expect(page.getByTestId('vanta-background')).toHaveCount(0)
})

test('legacy hub and SEO landing routes redirect to catalog', async ({ page }) => {
  await page.goto('/logiciel', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/projets\?type=logiciel/)

  await page.goto('/creation-site-web-montreal', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/projets\?type=web/)

  await page.goto('/portfolio/pageweb', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/portfolio\/projets\?type=web/)
})

test('home hero CTAs stay visible within the first viewport', async ({ page }) => {
  // Évite opacity/transform transitoires (même pattern que le test gateway).
  await page.emulateMedia({ reducedMotion: 'reduce' })

  const viewports = [
    { width: 390, height: 844 },
    { width: 844, height: 390 },
    { width: 1280, height: 800 },
    { width: 1920, height: 1080 },
  ]

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })

    const primaryCta = page.getByRole('link', { name: /Obtenir une estimation|Get an estimate/i }).first()
    const secondaryCta = page.getByRole('link', { name: /Voir les démos|See demos/i }).first()

    await expect(primaryCta).toBeVisible()
    await expect(secondaryCta).toBeVisible()

    const viewportHeight = await page.evaluate(() => window.innerHeight)
    const primaryBox = await primaryCta.boundingBox()
    const secondaryBox = await secondaryCta.boundingBox()

    expect(primaryBox).not.toBeNull()
    expect(secondaryBox).not.toBeNull()
    if (primaryBox && secondaryBox) {
      // Paysage court : tolérance un peu plus large (app bar + safe areas CI).
      const tolerance = viewport.height <= 400 ? 24 : 4
      expect(primaryBox.y + primaryBox.height).toBeLessThanOrEqual(viewportHeight + tolerance)
      expect(secondaryBox.y + secondaryBox.height).toBeLessThanOrEqual(viewportHeight + tolerance)
    }
  }
})

test('home service lanes expose web, support and software destinations', async ({ page }) => {
  // Remplace le gateway V1 (first viewport) : en V2 les services sont sous le hero.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const web = page.getByTestId('pv2-service-web')
  const support = page.getByTestId('pv2-service-support')
  const software = page.getByTestId('pv2-service-software')

  await web.scrollIntoViewIfNeeded()
  await expect(web).toBeVisible()
  await expect(support).toBeVisible()
  await expect(software).toBeVisible()

  await expect(web.getByRole('link')).toHaveAttribute('href', '/portfolio/projets?type=web')
  await expect(support.getByRole('link')).toHaveAttribute(
    'href',
    '/soutien-informatique-montreal',
  )
  await expect(software.getByRole('link')).toHaveAttribute(
    'href',
    '/portfolio/projets?type=logiciel',
  )
})

test('home software service links to logiciels showcase', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const software = page.getByTestId('pv2-service-software')
  await software.scrollIntoViewIfNeeded()
  await expect(software).toBeVisible()
  await expect(software.getByRole('link')).toHaveAttribute(
    'href',
    '/portfolio/projets?type=logiciel',
  )
})
test('site light mode uses dark text on home and contact', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('beigeDarkMode', '0')
    window.localStorage.setItem('beigeDarkUserChoice', '1')
  })

  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).not.toHaveClass(/dark/)

  const heroName = page.getByText(/Jean-François Lefebvre/i).first()
  await expect(heroName).toBeVisible()
  await expect
    .poll(async () => heroName.evaluate((el) => window.getComputedStyle(el).color))
    .not.toBe('rgb(244, 244, 245)')

  await page.goto('/portfolio/contact', { waitUntil: 'domcontentloaded' })
  const contactHeading = page.getByRole('heading', { level: 1 }).first()
  await expect(contactHeading).toBeVisible()
  await expect
    .poll(async () => contactHeading.evaluate((el) => window.getComputedStyle(el).color))
    .not.toBe('rgb(244, 244, 245)')
})

test('demos index and demo routes', async ({ page }) => {
  // Long multi-route walk; allow one aborted goto retry without inflating suite timeout.
  test.setTimeout(90_000)

  await gotoStable(page, '/demos')
  await expect(page).toHaveURL(/\/demos\/?$/)
  await expect(page.locator('h1').first()).toContainText(/Neuf directions créatives/)
  await expect(page.locator('a[href="/demos/studio"]').first()).toBeVisible()
  await expect(page.locator('a[href="/demos/spectacle"]').first()).toBeVisible()
  await expect(page.locator('a[href="/demos/volt"]').first()).toBeVisible()
  await expect(page.getByTestId('demos-grid-ready')).toBeVisible()

  const constructionLink = page.getByTestId('demo-link-construction')
  await constructionLink.scrollIntoViewIfNeeded()
  await Promise.all([
    page.waitForURL(/\/demos\/construction/),
    constructionLink.click(),
  ])
  await expect(page.locator('h1').filter({ hasText: /On bâtit solide/ })).toBeVisible()

  await gotoStable(page, '/demos')
  await page.locator('a[href="/demos/studio"]').first().click()
  await expect(page).toHaveURL(/\/demos\/studio/)
  await expect(page.locator('h1').filter({ hasText: /sans formule toute faite/ })).toBeVisible()

  await gotoStable(page, '/demos/spectacle')
  await expect(page.locator('h1').filter({ hasText: /Une scène pour les voix/ })).toBeVisible()

  await gotoStable(page, '/demos/portfolio')
  await expect(page.locator('h1').filter({ hasText: /pensés pour convertir/ })).toBeVisible()
  await expect(page.getByText('Jean-François Lefebvre')).toBeVisible()

  await gotoStable(page, '/demos/galerie')
  await expect(page.getByRole('link', { name: 'Ligne claire' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Maison Nord/ })).toBeVisible()

  await gotoStable(page, '/demos/volt')
  await expect(page.locator('h1').filter({ hasText: /Trop loud/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Voir le drop/i })).toBeVisible()
})

