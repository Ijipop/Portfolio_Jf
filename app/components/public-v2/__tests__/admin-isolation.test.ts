import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const appRoot = path.resolve(__dirname, '../../..')
const adminRoot = path.join(appRoot, 'admin')

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walkTsFiles(full, acc)
    else if (/\.(tsx?|jsx?)$/.test(name)) acc.push(full)
  }
  return acc
}

describe('public-v2 isolation from admin', () => {
  it('aucun fichier admin n’importe public-v2', () => {
    const files = walkTsFiles(adminRoot)
    expect(files.length).toBeGreaterThan(0)
    const offenders: string[] = []
    for (const file of files) {
      const src = readFileSync(file, 'utf8')
      if (
        src.includes('public-v2') ||
        src.includes('PublicThemeRoot') ||
        src.includes('PublicHeader') ||
        src.includes('PublicFooter')
      ) {
        offenders.push(path.relative(appRoot, file))
      }
    }
    expect(offenders).toEqual([])
  })

  it('le layout (public) n’installe pas PublicThemeRoot ni le chrome V2 globalement', () => {
    const src = readFileSync(path.join(appRoot, '(public)', 'layout.tsx'), 'utf8')
    expect(src).not.toMatch(/PublicThemeRoot/)
    expect(src).not.toMatch(/PublicHeader/)
    expect(src).not.toMatch(/PublicFooter/)
    expect(src).not.toMatch(/public-v2/)
    expect(src).not.toMatch(/data-public-theme/)
  })

  it('l’accueil / n’importe pas le chrome V2', () => {
    const src = readFileSync(path.join(appRoot, '(public)', 'page.tsx'), 'utf8')
    expect(src).not.toMatch(/PublicHeader/)
    expect(src).not.toMatch(/PublicFooter/)
    expect(src).not.toMatch(/PublicThemeRoot/)
  })

  it('la sandbox V2 n’utilise pas le layout public ni Prisma', () => {
    const layout = readFileSync(path.join(appRoot, '(v2-sandbox)', 'layout.tsx'), 'utf8')
    const page = readFileSync(
      path.join(appRoot, '(v2-sandbox)', 'v2-design-preview', 'page.tsx'),
      'utf8',
    )
    expect(layout).not.toMatch(/from ['"]@\/components\/ThemeWrapper['"]/)
    expect(layout).not.toMatch(/getCachedBeigePresentationBgUrl/)
    expect(layout).not.toMatch(/from ['"]@\/lib\/prisma['"]/)
    expect(page).toMatch(/PublicHeader/)
    expect(page).toMatch(/PublicFooter/)
    expect(page).not.toMatch(/from ['"]@\/lib\/prisma['"]/)
  })
})
