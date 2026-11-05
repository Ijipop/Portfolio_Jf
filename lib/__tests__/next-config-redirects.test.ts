import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const nextConfig = require('../../next.config.js') as {
  redirects: () => Promise<Array<{ source: string; destination: string; permanent: boolean }>>
}

describe('next.config redirects', () => {
  it('préserve les redirections produit et alias historiques', async () => {
    const redirects = await nextConfig.redirects()
    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: '/space-taker',
          destination: '/spacetaker',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/logiciel/timelendar',
          destination: '/logiciel/timelendr',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/logiciel/timelendar/merci',
          destination: '/logiciel/timelendr/merci',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/api/timelendar/:path*',
          destination: '/api/timelendr/:path*',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/creation-site-web-montreal',
          destination: '/portfolio/projets?type=web',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/pageweb',
          destination: '/portfolio/projets?type=web',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/portfolio/pageweb',
          destination: '/portfolio/projets?type=web',
          permanent: true,
        }),
      ]),
    )
  })

  it('n’ajoute pas de redirect CPU-ZE auto-référent', async () => {
    const redirects = await nextConfig.redirects()
    expect(redirects.some((item) => item.source.toLowerCase() === '/cpu-ze')).toBe(false)
  })
})
