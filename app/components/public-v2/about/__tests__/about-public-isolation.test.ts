import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const appRoot = path.join(process.cwd(), 'app')

describe('À propos V2 — isolation publique', () => {
  it('vit sous (site-pages) et non sous (public)', () => {
    expect(existsSync(path.join(appRoot, '(site-pages)', 'portfolio', 'a-propos', 'page.tsx'))).toBe(
      true,
    )
    expect(existsSync(path.join(appRoot, '(public)', 'portfolio', 'a-propos', 'page.tsx'))).toBe(
      false,
    )
  })

  it('n’importe pas Prisma ni ThemeWrapper sur la page', () => {
    const page = readFileSync(
      path.join(appRoot, '(site-pages)', 'portfolio', 'a-propos', 'page.tsx'),
      'utf8',
    )
    const client = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/about/AboutPageClient.tsx'),
      'utf8',
    )
    const content = readFileSync(
      path.join(process.cwd(), 'lib/public-v2/aboutPageContent.ts'),
      'utf8',
    )
    for (const src of [page, client, content]) {
      expect(src).not.toMatch(/from ['"]@\/lib\/prisma['"]/)
      expect(src).not.toMatch(/ThemeWrapper/)
      expect(src).not.toMatch(/getCachedBeigePresentationBgUrl/)
    }
  })

  it('ne touche pas aboutContent.ts de l’accueil', () => {
    const homeAbout = readFileSync(path.join(process.cwd(), 'lib/public-v2/aboutContent.ts'), 'utf8')
    expect(homeAbout).toMatch(/Derrière IJIPOP/)
    expect(homeAbout).toMatch(/ctaHref: '\/portfolio\/a-propos'/)
  })
})
