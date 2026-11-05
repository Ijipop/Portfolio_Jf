import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SpaceTakerLandingClient from '../SpaceTakerLandingClient'

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

vi.mock('@/components/product-landings/ProductImageCarousel', () => ({
  default: () => <div data-testid="spacetaker-gallery-mock" />,
}))

vi.mock('@/components/product-landings/ProductSecurityNotice', () => ({
  default: () => <div data-testid="spacetaker-security-mock" />,
}))

vi.mock('@/components/product-landings/ProductDownloadRow', () => ({
  default: ({
    items,
  }: {
    items: Array<{ href: string; label: string; primary?: boolean }>
  }) => (
    <div data-testid="spacetaker-downloads-mock">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </div>
  ),
}))

describe('SpaceTakerLandingClient (6B7)', () => {
  it('conserve marque, téléchargements et lien catalogue sans shell MUI', () => {
    render(
      <SpaceTakerLandingClient
        downloads={{
          windows: 'https://example.com/st-win.exe',
          macos: 'https://example.com/st-mac.dmg',
          github: 'https://github.com/example/spacetaker',
        }}
      />,
    )

    expect(screen.getByTestId('spacetaker-landing')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Space/)
    expect(screen.getByRole('link', { name: /Windows/i })).toHaveAttribute(
      'href',
      'https://example.com/st-win.exe',
    )
    expect(screen.getByRole('link', { name: /macOS/i })).toHaveAttribute(
      'href',
      'https://example.com/st-mac.dmg',
    )
    expect(screen.getByRole('link', { name: /GitHub|github/i })).toHaveAttribute(
      'href',
      'https://github.com/example/spacetaker',
    )
    expect(
      screen.getByRole('link', { name: /autres logiciels|other software/i }),
    ).toHaveAttribute('href', '/portfolio/projets?type=logiciel')
    expect(screen.getByTestId('spacetaker-gallery-mock')).toBeTruthy()
  })
})
