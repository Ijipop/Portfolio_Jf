import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const appRoot = path.resolve(__dirname, '..')

function readAppFile(...parts: string[]) {
  return readFileSync(path.join(appRoot, ...parts), 'utf8')
}

describe('layout isolation (public vs admin)', () => {
  it('le layout racine ne monte plus le chrome marketing', () => {
    const src = readAppFile('layout.tsx')
    expect(src).not.toMatch(/ThemeWrapper/)
    expect(src).not.toMatch(/FullPageTopologyWrapper/)
    expect(src).not.toMatch(/ContactFab/)
    expect(src).not.toMatch(/getCachedBeigePresentationBgUrl/)
    expect(src).toMatch(/SeoJsonLd/)
    expect(src).toMatch(/globals\.css/)
  })

  it('le layout (public) porte ThemeWrapper, topology et ContactFab', () => {
    const src = readAppFile('(public)', 'layout.tsx')
    expect(src).toMatch(/ThemeWrapper/)
    expect(src).toMatch(/FullPageTopologyWrapper/)
    expect(src).toMatch(/ContactFab/)
    expect(src).toMatch(/getCachedBeigePresentationBgUrl/)
    expect(src).not.toMatch(/AdminProviders/)
  })

  it('le layout admin porte AdminProviders sans chrome marketing', () => {
    const src = readAppFile('admin', 'layout.tsx')
    expect(src).toMatch(/AdminProviders/)
    expect(src).toMatch(/getCachedBeigePresentationBgUrl/)
    expect(src).not.toMatch(/from ['"]@\/components\/ThemeWrapper['"]/)
    expect(src).not.toMatch(/FullPageTopologyWrapper/)
    expect(src).not.toMatch(/ContactFab/)
  })

  it('préserve les URLs : accueil V2 sous (site-home), pages historiques sous (public)', () => {
    expect(existsSync(path.join(appRoot, '(site-home)', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(site-home)', 'layout.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, '(site-pages)', 'portfolio', 'projets', 'page.tsx'))).toBe(
      true,
    )
    expect(existsSync(path.join(appRoot, '(public)', 'portfolio', 'projets', 'page.tsx'))).toBe(
      false,
    )
    expect(existsSync(path.join(appRoot, '(site-pages)', 'portfolio', 'contact', 'page.tsx'))).toBe(
      true,
    )
    expect(
      existsSync(path.join(appRoot, '(site-pages)', 'portfolio', 'contact', 'merci', 'page.tsx')),
    ).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'portfolio', 'contact', 'page.tsx'))).toBe(
      false,
    )
    expect(existsSync(path.join(appRoot, '(site-pages)', 'portfolio', 'a-propos', 'page.tsx'))).toBe(
      true,
    )
    expect(existsSync(path.join(appRoot, '(public)', 'portfolio', 'a-propos', 'page.tsx'))).toBe(
      false,
    )
    expect(
      existsSync(path.join(appRoot, '(site-pages)', 'creation-site-web-montreal', 'page.tsx')),
    ).toBe(false)
    expect(existsSync(path.join(appRoot, '(public)', 'creation-site-web-montreal', 'page.tsx'))).toBe(
      false,
    )
    expect(
      existsSync(path.join(appRoot, '(site-pages)', 'soutien-informatique-montreal', 'page.tsx')),
    ).toBe(true)
    expect(
      existsSync(path.join(appRoot, '(public)', 'soutien-informatique-montreal', 'page.tsx')),
    ).toBe(false)
    expect(existsSync(path.join(appRoot, '(public)', 'portfolio', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(site-pages)', 'cpu-ze', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'cpu-ze', 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, '(site-pages)', 'spacetaker', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'spacetaker', 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, '(site-pages)', 'deskdot', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'deskdot', 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, '(site-pages)', 'traducteur', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'traducteur', 'page.tsx'))).toBe(false)
    expect(
      existsSync(path.join(appRoot, '(site-pages)', 'logiciel', 'timelendr', 'page.tsx')),
    ).toBe(true)
    expect(
      existsSync(path.join(appRoot, '(public)', 'logiciel', 'timelendr', 'page.tsx')),
    ).toBe(false)
    expect(
      existsSync(path.join(appRoot, '(site-pages)', 'logiciel', 'timelendr', 'merci', 'page.tsx')),
    ).toBe(true)
    expect(existsSync(path.join(appRoot, '(site-pages)', 'demos', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'demos', 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, '(public)', 'demos', 'construction', 'page.tsx'))).toBe(
      true,
    )
    expect(existsSync(path.join(appRoot, 'admin', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'admin', 'dashboard', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'api', 'projects', 'route.ts'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, 'portfolio'))).toBe(false)
  })

  it('isole l’accueil V2 et la sandbox hors layout public (pas de ThemeWrapper / Prisma beige)', () => {
    expect(existsSync(path.join(appRoot, '(v2-sandbox)', 'v2-design-preview', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'v2-design-preview'))).toBe(false)

    const siteHomeLayout = readAppFile('(site-home)', 'layout.tsx')
    expect(siteHomeLayout).not.toMatch(/from ['"]@\/components\/ThemeWrapper['"]/)
    expect(siteHomeLayout).not.toMatch(/FullPageTopologyWrapper/)
    expect(siteHomeLayout).not.toMatch(/ContactFab/)
    expect(siteHomeLayout).not.toMatch(/getCachedBeigePresentationBgUrl/)
    expect(siteHomeLayout).not.toMatch(/from ['"]@\/lib\/prisma['"]/)

    const siteHomePage = readAppFile('(site-home)', 'page.tsx')
    expect(siteHomePage).toMatch(/PopAtelierHomeShell/)
    expect(siteHomePage).not.toMatch(/HomeGatewayClient/)
    expect(siteHomePage).not.toMatch(/getCachedBeigePresentationBgUrl|from ['"]@prisma/)
    expect(siteHomePage).toMatch(/alternates:\s*\{[\s\S]*canonical:\s*['"]\/['"]/)

    const sandboxLayout = readAppFile('(v2-sandbox)', 'layout.tsx')
    expect(sandboxLayout).not.toMatch(/from ['"]@\/components\/ThemeWrapper['"]/)
    expect(sandboxLayout).not.toMatch(/FullPageTopologyWrapper/)
    expect(sandboxLayout).not.toMatch(/ContactFab/)
    expect(sandboxLayout).not.toMatch(/getCachedBeigePresentationBgUrl/)
    expect(sandboxLayout).not.toMatch(/from ['"]@\/lib\/prisma['"]/)

    const previewPage = readAppFile('(v2-sandbox)', 'v2-design-preview', 'page.tsx')
    expect(previewPage).toMatch(/PopAtelierHomeShell/)
    expect(previewPage).toMatch(/pv2-foundations-lab|pv2-lab-foundations/)

    const publicLayout = readAppFile('(public)', 'layout.tsx')
    expect(publicLayout).toMatch(/getCachedBeigePresentationBgUrl/)

    const spaceTakerPage = readAppFile('(site-pages)', 'spacetaker', 'page.tsx')
    expect(spaceTakerPage).toMatch(/PublicChromeShell/)
    expect(spaceTakerPage).toMatch(/getSpaceTakerDownloads/)
    expect(spaceTakerPage).not.toMatch(/ThemeWrapper|ProductLandingShell/)

    const cpuZePage = readAppFile('(site-pages)', 'cpu-ze', 'page.tsx')
    expect(cpuZePage).toMatch(/PublicChromeShell/)
    expect(cpuZePage).toMatch(/getCpuZeDownloads/)
    expect(cpuZePage).not.toMatch(/ThemeWrapper|ProductLandingShell/)

    const traducteurPage = readAppFile('(site-pages)', 'traducteur', 'page.tsx')
    expect(traducteurPage).toMatch(/PublicChromeShell/)
    expect(traducteurPage).toMatch(/getTraducteurDownloads/)
    expect(traducteurPage).not.toMatch(/ThemeWrapper|ProductLandingShell/)

    const deskDotPage = readAppFile('(site-pages)', 'deskdot', 'page.tsx')
    expect(deskDotPage).toMatch(/PublicChromeShell/)
    expect(deskDotPage).toMatch(/getDeskDotDownloads/)
    expect(deskDotPage).not.toMatch(/ThemeWrapper|ProductLandingShell/)

    const timelendrPage = readAppFile('(site-pages)', 'logiciel', 'timelendr', 'page.tsx')
    expect(timelendrPage).toMatch(/PublicChromeShell/)
    expect(timelendrPage).toMatch(/TimelendrLandingClient/)
    expect(timelendrPage).not.toMatch(/ThemeWrapper|ProductLandingShell/)

    const timelendrMerci = readAppFile('(site-pages)', 'logiciel', 'timelendr', 'merci', 'page.tsx')
    expect(timelendrMerci).toMatch(/PublicChromeShell/)
    expect(timelendrMerci).not.toMatch(/PageWrapper/)

    const demosHub = readAppFile('(site-pages)', 'demos', 'page.tsx')
    expect(demosHub).toMatch(/PublicChromeShell/)
    expect(demosHub).toMatch(/DEMOS_CATALOG/)
    expect(demosHub).not.toMatch(/PageWrapper|AppBarComponent|DemosIndexShell/)

    const demosHubLayout = readAppFile('(site-pages)', 'demos', 'layout.tsx')
    expect(demosHubLayout).toMatch(/robots:\s*\{\s*index:\s*false/)
  })




  it('conserve la protection JWT du dashboard', () => {
    const src = readAppFile('admin', 'dashboard', 'layout.tsx')
    expect(src).toMatch(/adminToken/)
    expect(src).toMatch(/jwt\.verify/)
    expect(src).toMatch(/redirect\('\/admin'\)/)
  })
})
