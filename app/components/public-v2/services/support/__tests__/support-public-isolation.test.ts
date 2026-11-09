import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const appRoot = path.join(process.cwd(), 'app')

describe('soutien V2 isolation', () => {
  it('route sous site-pages avec PublicChromeShell', () => {
    expect(
      existsSync(path.join(appRoot, '(site-pages)', 'soutien-informatique-montreal', 'page.tsx')),
    ).toBe(true)
    expect(
      existsSync(path.join(appRoot, '(public)', 'soutien-informatique-montreal', 'page.tsx')),
    ).toBe(false)
    const page = readFileSync(
      path.join(appRoot, '(site-pages)', 'soutien-informatique-montreal', 'page.tsx'),
      'utf8',
    )
    expect(page).toMatch(/PublicChromeShell/)
    expect(page).toMatch(/SupportPageClient/)
    expect(page).not.toMatch(/PageWrapper|AppBarComponent/)
  })

  it('conserve SupportContactForm (îlot MUI) sans ThemeWrapper ni Prisma', () => {
    const page = readFileSync(
      path.join(appRoot, '(site-pages)', 'soutien-informatique-montreal', 'page.tsx'),
      'utf8',
    )
    const client = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/services/support/SupportPageClient.tsx'),
      'utf8',
    )
    const island = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/services/support/SupportFormMuiIsland.tsx'),
      'utf8',
    )
    expect(page).not.toMatch(/ThemeWrapper/)
    expect(client).toMatch(/SupportContactForm/)
    expect(client).toMatch(/SupportFormMuiIsland/)
    expect(client).not.toMatch(/ThemeWrapper/)
    expect(island).toMatch(/AdvancedThemeIslandProvider/)
    expect(island).not.toMatch(/SiteDarkBackdrop|syncPortfolioThemeToDocument|CssBaseline/)
    expect(client).not.toMatch(/from ['"]@\/lib\/prisma|@prisma/)
  })

  it('métadonnées SEO préservées', () => {
    const layout = readFileSync(
      path.join(appRoot, '(site-pages)', 'soutien-informatique-montreal', 'layout.tsx'),
      'utf8',
    )
    expect(layout).toMatch(/Soutien informatique/)
    expect(layout).toMatch(/447-3183/)
    expect(layout).toMatch(/canonical/)
  })
})
