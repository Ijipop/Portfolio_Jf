import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Button from '../Button/Button'
import PublicThemeRoot from '../../theme/PublicThemeRoot'

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

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

function renderInTheme(ui: ReactElement) {
  return render(<PublicThemeRoot>{ui}</PublicThemeRoot>)
}

describe('public-v2 Button', () => {
  it('rend les variantes primary, ghost et emphasis', () => {
    renderInTheme(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="emphasis">Emphasis</Button>
      </>,
    )
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ghost' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Emphasis' })).toBeInTheDocument()
  })

  it('applique size sm et md via classes distinctes', () => {
    renderInTheme(
      <>
        <Button size="sm">Petit</Button>
        <Button size="md">Moyen</Button>
      </>,
    )
    const sm = screen.getByRole('button', { name: 'Petit' })
    const md = screen.getByRole('button', { name: 'Moyen' })
    expect(sm.className).not.toEqual(md.className)
    expect(sm.className).toMatch(/sm/)
    expect(md.className).toMatch(/md/)
  })

  it('rend un lien interne avec href', () => {
    renderInTheme(
      <Button href="/portfolio/contact" variant="primary">
        Contact
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Contact' })
    expect(link).toHaveAttribute('href', '/portfolio/contact')
  })

  it('honore disabled', () => {
    renderInTheme(
      <Button disabled variant="emphasis">
        Off
      </Button>,
    )
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled()
  })
})
