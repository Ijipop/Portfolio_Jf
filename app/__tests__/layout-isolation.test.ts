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

  it('préserve les URLs : pages publiques sous (public), admin et api hors groupe', () => {
    expect(existsSync(path.join(appRoot, '(public)', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'portfolio', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'cpu-ze', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'spacetaker', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'deskdot', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'traducteur', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'logiciel', 'timelendr', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, '(public)', 'demos', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'admin', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'admin', 'dashboard', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'api', 'projects', 'route.ts'))).toBe(true)
    expect(existsSync(path.join(appRoot, 'page.tsx'))).toBe(false)
    expect(existsSync(path.join(appRoot, 'portfolio'))).toBe(false)
  })

  it('conserve la protection JWT du dashboard', () => {
    const src = readAppFile('admin', 'dashboard', 'layout.tsx')
    expect(src).toMatch(/adminToken/)
    expect(src).toMatch(/jwt\.verify/)
    expect(src).toMatch(/redirect\('\/admin'\)/)
  })
})
