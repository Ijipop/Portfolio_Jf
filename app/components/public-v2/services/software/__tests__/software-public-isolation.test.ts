import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const appRoot = path.join(process.cwd(), 'app')

describe('software landing isolation', () => {
  it('vit sous (site-pages), pas (public)', () => {
    expect(
      existsSync(
        path.join(appRoot, '(site-pages)', 'developpement-logiciels-montreal', 'page.tsx'),
      ),
    ).toBe(true)
    expect(
      existsSync(path.join(appRoot, '(public)', 'developpement-logiciels-montreal', 'page.tsx')),
    ).toBe(false)
  })

  it('branche PublicChromeShell + SoftwarePageClient', () => {
    const src = readFileSync(
      path.join(appRoot, '(site-pages)', 'developpement-logiciels-montreal', 'page.tsx'),
      'utf8',
    )
    expect(src).toMatch(/PublicChromeShell/)
    expect(src).toMatch(/SoftwarePageClient/)
    expect(src).toMatch(/pv2-software-main/)
  })

  it('servicesContent pointe la landing logiciels', () => {
    const src = readFileSync(
      path.join(process.cwd(), 'lib/public-v2/servicesContent.ts'),
      'utf8',
    )
    expect(src).toMatch(/\/developpement-logiciels-montreal/)
  })
})
