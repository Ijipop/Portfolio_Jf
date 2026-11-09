import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Hero isolation', () => {
  it('est monté uniquement via PopAtelierHomeShell (accueil + sandbox)', () => {
    const shell = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/home/PopAtelierHomeShell.tsx'),
      'utf8',
    )
    expect(shell).toMatch(/from ['"]@\/components\/public-v2\/sections\/Hero['"]/)
    expect(shell).toMatch(/<Hero\s*\/>/)

    const home = readFileSync(path.join(process.cwd(), 'app/(site-home)/page.tsx'), 'utf8')
    expect(home).toMatch(/PopAtelierHomeShell/)
    expect(home).not.toMatch(/sections\/Hero/)

    const preview = readFileSync(
      path.join(process.cwd(), 'app/(v2-sandbox)/v2-design-preview/page.tsx'),
      'utf8',
    )
    expect(preview).toMatch(/PopAtelierHomeShell/)
    expect(preview).not.toMatch(/sections\/Hero/)

    const publicRoot = path.join(process.cwd(), 'app/(public)')
    const stack = [publicRoot]
    const offenders: string[] = []
    while (stack.length) {
      const dir = stack.pop()!
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          stack.push(full)
          continue
        }
        if (!/\.(tsx|ts|jsx|js)$/.test(entry.name)) continue
        const src = readFileSync(full, 'utf8')
        if (src.includes('public-v2/sections/Hero') || src.includes("sections/Hero'")) {
          offenders.push(path.relative(process.cwd(), full))
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
