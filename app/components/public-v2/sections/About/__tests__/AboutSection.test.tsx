import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../../theme/PublicThemeRoot'
import { ABOUT_COPY } from '@/lib/public-v2/aboutContent'
import AboutSection from '../AboutSection'

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

describe('AboutSection V2', () => {
  it('présente Jean-François Lefebvre avec CTA vers /portfolio/a-propos', () => {
    render(
      <PublicThemeRoot>
        <AboutSection />
      </PublicThemeRoot>,
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(ABOUT_COPY.title)
    expect(screen.getByText(/Jean-François Lefebvre/)).toBeInTheDocument()
    expect(screen.getByText(/Montréal/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: ABOUT_COPY.ctaLabel })).toHaveAttribute(
      'href',
      '/portfolio/a-propos',
    )

    const photo = screen.getByRole('img', { name: ABOUT_COPY.photo.alt })
    expect(photo).toHaveAttribute('src', '/img/Jf.jpg')

    expect(document.getElementById('pv2-a-propos')).toBeTruthy()
    expect(document.body.textContent).not.toMatch(/sandbox|contenu provisoire|parcours contact/i)
  })

  it('n’introduit ni formulaire, ni Prisma, ni détails médicaux', () => {
    const section = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/sections/About/AboutSection.tsx'),
      'utf8',
    )
    const content = readFileSync(path.join(process.cwd(), 'lib/public-v2/aboutContent.ts'), 'utf8')

    expect(section).not.toMatch(/<form|from ['"]@prisma/)
    expect(content).not.toMatch(/AVC|enfants|médical|from ['"]@prisma/)
    expect(content).toMatch(/Jf\.jpg/)
  })
})
