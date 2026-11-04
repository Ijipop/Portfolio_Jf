import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../../theme/PublicThemeRoot'
import { CONTACT_COPY } from '@/lib/public-v2/contactContent'
import ContactSection from '../ContactSection'

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

describe('ContactSection V2', () => {
  it('affiche le titre, le lead et le CTA vers /portfolio/contact', () => {
    render(
      <PublicThemeRoot>
        <ContactSection />
      </PublicThemeRoot>,
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(CONTACT_COPY.title)
    expect(screen.getByText(CONTACT_COPY.lead)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: CONTACT_COPY.ctaLabel })).toHaveAttribute(
      'href',
      '/portfolio/contact',
    )

    const section = document.getElementById('pv2-contact')
    expect(section).toBeTruthy()
    expect(section).toHaveAttribute('data-pv2-section', 'ink')
    expect(document.body.textContent).not.toMatch(/sandbox|parcours contact|contenu provisoire/i)
  })

  it('n’introduit ni formulaire inline, ni API, ni Prisma', () => {
    const section = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/sections/Contact/ContactSection.tsx'),
      'utf8',
    )
    const content = readFileSync(
      path.join(process.cwd(), 'lib/public-v2/contactContent.ts'),
      'utf8',
    )

    expect(section).not.toMatch(/<form|fetch\(|from ['"]@prisma|api\/contact/)
    expect(content).not.toMatch(/from ['"]@prisma|<form/)
    expect(content).toMatch(/\/portfolio\/contact/)
  })
})
