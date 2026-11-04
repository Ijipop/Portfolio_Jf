import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../../theme/PublicThemeRoot'
import { WORK_COPY, WORK_FEATURES } from '@/lib/public-v2/workContent'
import WorkSection from '../WorkSection'

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

describe('WorkSection V2', () => {
  it('présente Expression, Thermo et DeskDot avec rôles distincts', () => {
    render(
      <PublicThemeRoot>
        <WorkSection />
      </PublicThemeRoot>,
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(WORK_COPY.title)
    expect(screen.getByRole('link', { name: WORK_COPY.catalogLinkLabel })).toHaveAttribute(
      'href',
      '/portfolio/projets',
    )

    expect(WORK_FEATURES.map((f) => f.id)).toEqual([
      'expression-lasalle',
      'thermo-trappeur',
      'deskdot',
    ])
    expect(WORK_FEATURES.map((f) => f.role)).toEqual(['primary', 'secondary', 'soft'])

    expect(screen.getByTestId('pv2-work-expression-lasalle')).toHaveAttribute(
      'data-publishable',
      'false',
    )
    expect(screen.getByTestId('pv2-work-thermo-trappeur')).toHaveAttribute(
      'data-publishable',
      'false',
    )
    expect(screen.getByTestId('pv2-work-deskdot')).toHaveAttribute('data-publishable', 'true')
    expect(screen.getByTestId('pv2-work-deskdot')).toHaveAttribute('data-work-role', 'soft')
  })

  it('DeskDot est un logiciel Windows ; Expression sans faux lien public', () => {
    render(
      <PublicThemeRoot>
        <WorkSection />
      </PublicThemeRoot>,
    )

    const deskdot = WORK_FEATURES.find((f) => f.id === 'deskdot')!
    expect(deskdot.media.kind).toBe('product')
    expect(deskdot.tags.toLowerCase()).toContain('windows')
    expect(screen.getByRole('link', { name: 'Voir la page produit' })).toHaveAttribute(
      'href',
      '/deskdot',
    )

    const expression = WORK_FEATURES.find((f) => f.id === 'expression-lasalle')!
    expect(expression.ctas).toHaveLength(0)

    const thermo = WORK_FEATURES.find((f) => f.id === 'thermo-trappeur')!
    expect(thermo.ctas[0]?.href).toBe('https://www.thermo-trappeur.ca/fr')
    expect(screen.getByRole('link', { name: 'Voir le site' })).toHaveAttribute(
      'href',
      'https://www.thermo-trappeur.ca/fr',
    )
  })

  it('n’introduit ni Prisma ni second catalogue CRUD', () => {
    const content = readFileSync(path.join(process.cwd(), 'lib/public-v2/workContent.ts'), 'utf8')
    const section = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/sections/Work/WorkSection.tsx'),
      'utf8',
    )
    expect(content).toMatch(/Sélection éditoriale temporaire/)
    expect(content).not.toMatch(/from ['"]@prisma|from ['"][^'"]*prisma/i)
    expect(section).not.toMatch(/from ['"]@prisma|createProject|useQuery/i)
  })

  it('expose les alts médias et marque SpaceTaker hors sélection', () => {
    render(
      <PublicThemeRoot>
        <WorkSection />
      </PublicThemeRoot>,
    )

    for (const feature of WORK_FEATURES) {
      expect(screen.getByAltText(feature.media.desktopAlt)).toBeInTheDocument()
    }
    expect(WORK_FEATURES.some((f) => f.id.includes('spacetaker'))).toBe(false)
  })
})
