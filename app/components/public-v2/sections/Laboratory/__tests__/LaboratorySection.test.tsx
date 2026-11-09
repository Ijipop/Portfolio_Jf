import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../../theme/PublicThemeRoot'
import { HOME_LAB_FEATURED_IDS } from '@/lib/content/demos-catalog'
import { LABORATORY_COPY, getLaboratoryFeatures } from '@/lib/public-v2/laboratoryContent'
import LaboratorySection from '../LaboratorySection'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

describe('LaboratorySection V2', () => {
  it('affiche trois aperçus distincts issus du catalogue', () => {
    render(
      <PublicThemeRoot>
        <LaboratorySection />
      </PublicThemeRoot>,
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(LABORATORY_COPY.title)
    expect(document.getElementById('pv2-laboratory')).toBeTruthy()

    const features = getLaboratoryFeatures()
    expect(features.map((f) => f.id)).toEqual([...HOME_LAB_FEATURED_IDS])

    for (const feature of features) {
      expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: `${LABORATORY_COPY.ctaLabel} — ${feature.title}` }),
      ).toHaveAttribute('href', feature.href)
    }

    expect(screen.getByRole('link', { name: LABORATORY_COPY.catalogLinkLabel })).toHaveAttribute(
      'href',
      '/demos',
    )

    expect(document.querySelector('[data-lab-nav-hint]')?.closest('[class*="faux"]')).toBeNull()
    expect(document.querySelectorAll('[data-lab-nav-hint]')).toHaveLength(3)
    expect(document.body.innerHTML).not.toMatch(/fauxBar|fauxPill/)
  })

  it('n’introduit ni Prisma ni second catalogue permanent', () => {
    const section = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/sections/Laboratory/LaboratorySection.tsx'),
      'utf8',
    )
    const content = readFileSync(
      path.join(process.cwd(), 'lib/public-v2/laboratoryContent.ts'),
      'utf8',
    )
    expect(section).toMatch(/demos-catalog|getLaboratoryFeatures|laboratoryContent/)
    expect(content).toMatch(/getHomeLabFeaturedDemos/)
    expect(content).not.toMatch(/from ['"]@prisma/)
    expect(section).not.toMatch(/from ['"]@prisma/)
  })
})
