import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../../theme/PublicThemeRoot'
import { HERO_COPY, HERO_FLOATS } from '@/lib/public-v2/heroContent'
import Hero from '../Hero'

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

describe('Hero V2', () => {
  it('affiche le titre, la description et les CTA provisoires', () => {
    render(
      <PublicThemeRoot>
        <Hero />
      </PublicThemeRoot>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(HERO_COPY.title)
    expect(screen.getByText(HERO_COPY.description)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: HERO_COPY.primaryCta.label })).toHaveAttribute(
      'href',
      HERO_COPY.primaryCta.href,
    )
    expect(screen.getByRole('link', { name: HERO_COPY.secondaryCta.label })).toHaveAttribute(
      'href',
      HERO_COPY.secondaryCta.href,
    )
  })

  it('expose les médias avec Expression dominante et DeskDot tertiaire', () => {
    render(
      <PublicThemeRoot>
        <Hero />
      </PublicThemeRoot>,
    )

    expect(HERO_FLOATS.map((f) => f.id)).toEqual([
      'expression-lasalle',
      'thermo-trappeur',
      'deskdot',
    ])
    expect(HERO_FLOATS[0]?.slot).toBe('a')
    expect(HERO_FLOATS[1]?.slot).toBe('b')
    expect(HERO_FLOATS[2]?.slot).toBe('c')
    expect(HERO_FLOATS.some((f) => f.id.includes('spacetaker'))).toBe(false)

    for (const float of HERO_FLOATS) {
      expect(screen.getByText(float.alt)).toBeInTheDocument()
    }

    const deskdot = HERO_FLOATS.find((f) => f.id === 'deskdot')
    expect(deskdot?.publishable).toBe(true)
    expect(deskdot?.src).toBe('/img/deskdot/deskdot2.png')

    const expression = HERO_FLOATS.find((f) => f.id === 'expression-lasalle')
    const thermo = HERO_FLOATS.find((f) => f.id === 'thermo-trappeur')
    expect(expression?.publishable).toBe(true)
    expect(thermo?.publishable).toBe(true)
    expect(expression?.src).toBe('/img/portfolio/expression-lasalle-desktop.png')
    expect(thermo?.src).toBe('/img/portfolio/thermo-trappeur-desktop.png')
    expect(HERO_FLOATS.every((f) => f.publishable)).toBe(true)
    expect(HERO_FLOATS.every((f) => !f.src.includes('/img/v2-sandbox/'))).toBe(true)
  })

  it('n’importe ni Prisma ni API métier', () => {
    const dir = path.join(process.cwd(), 'app/components/public-v2/sections/Hero')
    const files = ['Hero.tsx', 'HeroCollage.tsx', 'index.ts']
    for (const file of files) {
      const src = readFileSync(path.join(dir, file), 'utf8')
      expect(src).not.toMatch(/from ['"]@\/lib\/prisma['"]/)
      expect(src).not.toMatch(/from ['"][^'"]*\/api\//)
    }
    const content = readFileSync(
      path.join(process.cwd(), 'lib/public-v2/heroContent.ts'),
      'utf8',
    )
    expect(content).not.toMatch(/prisma/i)
  })
})
