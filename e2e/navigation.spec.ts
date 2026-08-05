import { expect, test } from '@playwright/test'

test('landing reaches portfolio and contact in two clicks max', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await expect(page.getByTestId('gateway-choice-web')).toBeVisible()
  await expect(page.getByTestId('gateway-choice-support')).toBeVisible()
  await expect(page.getByTestId('gateway-choice-software')).toBeVisible()
  const gatewayHeading = page.getByRole('heading', { level: 1 })
  await expect(gatewayHeading).toContainText(/Bienvenue chez|Welcome to/i)
  await expect(gatewayHeading).toContainText(/ijipop/i)
  await expect(gatewayHeading).toContainText(/solutions/i)
  await expect(page.getByText(/Que puis-je faire pour vous|How can I help you/i).first()).toBeVisible()

  await page.getByTestId('gateway-choice-web').click()
  await expect(page).toHaveURL(/\/portfolio\/?$/)

  const contactNav = page.getByRole('banner').getByRole('link', { name: /^Contact$/i })
  await expect(contactNav).toBeVisible()
  await Promise.all([
    page.waitForURL(/\/portfolio\/contact/),
    contactNav.click(),
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

test('portfolio home has CSS backdrop and no Vanta (reduced motion)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })

  await expect(page.getByTestId('home-v2-backdrop')).toBeVisible()
  await expect(page.getByTestId('graphics-background-layer')).toHaveCount(0)
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
      const tolerance = 4
      expect(primaryBox.y + primaryBox.height).toBeLessThanOrEqual(viewportHeight + tolerance)
      expect(secondaryBox.y + secondaryBox.height).toBeLessThanOrEqual(viewportHeight + tolerance)
    }
  }
})

test('gateway choice CTAs stay visible within the first viewport', async ({ page }) => {
  // Évite opacity/transform transitoires qui font renvoyer null à boundingBox() en CI.
  await page.emulateMedia({ reducedMotion: 'reduce' })

  const viewports = [
    { width: 390, height: 844 },
    { width: 1280, height: 800 },
  ]

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    await page.goto('/', { waitUntil: 'load' })

    const webCta = page.getByTestId('gateway-choice-web')
    const supportCta = page.getByTestId('gateway-choice-support')
    const softwareCta = page.getByTestId('gateway-choice-software')

    await expect(webCta).toBeVisible()
    await expect(supportCta).toBeVisible()
    await expect(softwareCta).toBeVisible()

    const isFullyInFirstViewport = (testId: string) =>
      page.evaluate((id) => {
        const el = document.querySelector(`[data-testid="${id}"]`)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        const tolerance = 8
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.top >= -tolerance &&
          rect.bottom <= window.innerHeight + tolerance
        )
      }, testId)

    await expect.poll(() => isFullyInFirstViewport('gateway-choice-web')).toBe(true)
    await expect.poll(() => isFullyInFirstViewport('gateway-choice-support')).toBe(true)
    await expect.poll(() => isFullyInFirstViewport('gateway-choice-software')).toBe(true)
  }
})

test('gateway software card links to logiciels showcase', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const softwareCta = page.getByTestId('gateway-choice-software')
  await expect(softwareCta).toBeVisible()
  await expect(softwareCta).toHaveAttribute('href', '/portfolio/projets?type=logiciel')
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

