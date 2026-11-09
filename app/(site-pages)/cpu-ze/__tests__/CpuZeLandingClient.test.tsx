import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CpuZeLandingClient from '../CpuZeLandingClient'

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
  default: () => <div data-testid="cpu-ze-gallery-mock" />,
}))

vi.mock('@/components/product-landings/ProductSecurityNotice', () => ({
  default: () => <div data-testid="cpu-ze-security-mock" />,
}))

vi.mock('@/components/product-landings/ProductDownloadRow', () => ({
  default: ({
    items,
  }: {
    items: Array<{ href: string; label: string; primary?: boolean }>
  }) => (
    <div data-testid="cpu-ze-downloads-mock">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </div>
  ),
}))

describe('CpuZeLandingClient (6B8)', () => {
  it('conserve marque, téléchargement Windows et lien catalogue sans shell MUI', () => {
    render(
      <CpuZeLandingClient
        downloads={{
          windows: 'https://example.com/cpu-ze.exe',
          github: 'https://github.com/example/cpu-ze',
        }}
      />,
    )

    expect(screen.getByTestId('cpu-ze-landing')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/CPU-ZE/i)
    expect(screen.getByRole('link', { name: /Windows/i })).toHaveAttribute(
      'href',
      'https://example.com/cpu-ze.exe',
    )
    expect(screen.getByRole('link', { name: /GitHub|github/i })).toHaveAttribute(
      'href',
      'https://github.com/example/cpu-ze',
    )
    expect(
      screen.getByRole('link', { name: /autres logiciels|other software/i }),
    ).toHaveAttribute('href', '/portfolio/projets?type=logiciel')
    expect(screen.getByTestId('cpu-ze-gallery-mock')).toBeTruthy()
  })
})
