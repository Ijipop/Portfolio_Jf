import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { DEMOS_CATALOG } from '@/lib/content/demos-catalog'

const hubPage = readFileSync(
  path.resolve(__dirname, '..', 'page.tsx'),
  'utf8',
)
const hubLayout = readFileSync(
  path.resolve(__dirname, '..', 'layout.tsx'),
  'utf8',
)

describe('Phase 6C demos hub', () => {
  it('monte PublicChromeShell et les neuf liens du catalogue', () => {
    expect(hubPage).toMatch(/PublicChromeShell/)
    expect(hubPage).toMatch(/pathname=\"\/demos\"/)
    expect(hubPage).toMatch(/DEMOS_CATALOG/)
    expect(hubPage).not.toMatch(/PageWrapper|AppBarComponent|DemosIndexShell/)
    expect(DEMOS_CATALOG).toHaveLength(9)
    for (const demo of DEMOS_CATALOG) {
      expect(demo.href).toMatch(/^\/demos\//)
    }
  })

  it('conserve robots.index false', () => {
    expect(hubLayout).toMatch(/robots:\s*\{\s*index:\s*false/)
  })
})
