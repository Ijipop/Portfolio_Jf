import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TraducteurLandingClient from '../TraducteurLandingClient'

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

vi.mock('@/components/product-landings/ProductDownloadRow', () => ({
  default: ({
    items,
  }: {
    items: Array<{ href: string; label: string; primary?: boolean }>
  }) => (
    <div data-testid="traducteur-downloads-mock">
      {items.map((item) => (
        <a key={`${item.href}-${item.label}`} href={item.href}>
          {item.label}
        </a>
      ))}
    </div>
  ),
}))

describe('TraducteurLandingClient (6B8)', () => {
  it('conserve marque, téléchargement Windows et capture sans shell MUI', () => {
    render(
      <TraducteurLandingClient
        downloads={{
          windows: 'https://example.com/traducteur.exe',
          github: 'https://github.com/example/traducteur',
        }}
      />,
    )

    expect(screen.getByTestId('traducteur-landing')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(screen.getAllByRole('link', { name: /Windows/i }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /GitHub|github/i })).toHaveAttribute(
      'href',
      'https://github.com/example/traducteur',
    )
    expect(
      screen.getByRole('link', { name: /autres logiciels|other software/i }),
    ).toHaveAttribute('href', '/portfolio/projets?type=logiciel')
    expect(screen.getByRole('img')).toHaveAttribute('src', '/imgs/images/LeTraducteur.png')
  })
})
