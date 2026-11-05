import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const appRoot = path.join(process.cwd(), 'app')

describe('Contact V2 — isolation publique vs sandbox', () => {
  it('la route publique n’active jamais le mock ni ContactSandboxPreview', () => {
    const pagePath = path.join(appRoot, '(site-pages)', 'portfolio', 'contact', 'page.tsx')
    expect(existsSync(pagePath)).toBe(true)
    const src = readFileSync(pagePath, 'utf8')
    expect(src).toMatch(/ContactPageClient/)
    expect(src).not.toMatch(/ContactSandboxPreview/)
    expect(src).not.toMatch(/submitMode\s*=\s*['"]mock['"]/)
    expect(src).not.toMatch(/mockLocalMerci/)
    expect(src).not.toMatch(/mockScenario/)
  })

  it('ContactSandboxPreview n’est branché que dans la sandbox', () => {
    const preview = readFileSync(
      path.join(appRoot, '(v2-sandbox)', 'v2-design-preview', 'page.tsx'),
      'utf8',
    )
    expect(preview).toMatch(/ContactSandboxPreview/)
    expect(preview).toMatch(/pv2-contact-fixtures-preview/)
  })
})
