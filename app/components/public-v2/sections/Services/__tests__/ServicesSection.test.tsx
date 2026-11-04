import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../../theme/PublicThemeRoot'
import { SERVICE_OFFERS, SERVICES_COPY } from '@/lib/public-v2/servicesContent'
import ServicesSection from '../ServicesSection'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

describe('ServicesSection V2', () => {
  it('conserve id pv2-services et les trois offres provisoires', () => {
    render(
      <PublicThemeRoot>
        <ServicesSection />
      </PublicThemeRoot>,
    )

    expect(document.getElementById('pv2-services')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(SERVICES_COPY.title)
    expect(SERVICE_OFFERS).toHaveLength(3)

    for (const offer of SERVICE_OFFERS) {
      expect(screen.getByRole('heading', { level: 3, name: offer.title })).toBeInTheDocument()
      const card = screen.getByTestId(`pv2-service-${offer.id}`)
      expect(card.querySelector('a')).toHaveAttribute('href', offer.href)
    }

    expect(SERVICE_OFFERS.map((o) => o.href)).toEqual([
      '/creation-site-web-montreal',
      '/soutien-informatique-montreal',
      '/logiciel',
    ])
  })

  it('n’importe pas Prisma ni d’API métier', () => {
    const src = readFileSync(path.join(process.cwd(), 'lib/public-v2/servicesContent.ts'), 'utf8')
    expect(src).not.toMatch(/from ['"]@prisma|from ['"]@\/lib\/prisma|fetch\(/i)
  })
})

