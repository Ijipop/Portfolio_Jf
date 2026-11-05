import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DeskDotLandingClient from '../DeskDotLandingClient'

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string
    children: React.ReactNode
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

vi.mock('@/components/shared/AutoplayLoopVideo', () => ({
  default: () => <div data-testid="deskdot-demo-mock" />,
}))

vi.mock('../DeskDotPhotoStack', () => ({
  default: () => <div data-testid="deskdot-stack-mock" />,
}))

vi.mock('../DeskDotPitchTitle', () => ({
  default: () => <h2 data-testid="deskdot-pitch-mock">pitch</h2>,
}))

vi.mock('@/components/product-landings/ProductSecurityNotice', () => ({
  default: () => <div data-testid="deskdot-security-mock" />,
}))

vi.mock('@/components/product-landings/ProductDownloadRow', () => ({
  default: ({
    items,
  }: {
    items: Array<{ href: string; label: string; primary?: boolean; disabled?: boolean }>
  }) => (
    <div data-testid="deskdot-downloads-mock">
      {items.map((item) => (
        <a
          key={`${item.href}-${item.label}`}
          href={item.href}
          aria-disabled={item.disabled ? 'true' : undefined}
        >
          {item.label}
        </a>
      ))}
    </div>
  ),
}))

describe('DeskDotLandingClient (6B9)', () => {
  it('conserve marque, stack, démo et lien catalogue sans shell MUI', () => {
    render(
      <DeskDotLandingClient
        downloads={{
          windows: 'https://example.com/deskdot.exe',
          github: '',
        }}
      />,
    )

    expect(screen.getByTestId('deskdot-landing')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Desk/)
    expect(screen.getByRole('link', { name: /Windows/i })).toHaveAttribute(
      'href',
      'https://example.com/deskdot.exe',
    )
    expect(
      screen.getByRole('link', { name: /autres logiciels|other software/i }),
    ).toHaveAttribute('href', '/portfolio/projets?type=logiciel')
    expect(screen.getByTestId('deskdot-stack-mock')).toBeTruthy()
    expect(screen.getByTestId('deskdot-demo-mock')).toBeTruthy()
    expect(screen.getByTestId('deskdot-pitch-mock')).toBeTruthy()
  })

  it('affiche downloadSoon quand aucun lien Windows', () => {
    render(
      <DeskDotLandingClient
        downloads={{
          windows: '',
          github: '',
        }}
      />,
    )

    const soon = screen.getByRole('link', { name: /Bientôt disponible|Coming soon/i })
    expect(soon).toHaveAttribute('href', '#')
    expect(soon.getAttribute('aria-disabled')).toBe('true')
  })
})

