import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import TimelendrLandingClient from '../TimelendrLandingClient'

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

vi.mock('../TimelendrCarousel', () => ({
  default: () => <div data-testid="timelendr-carousel-mock" />,
}))

vi.mock('@/components/product-landings/ProductSecurityNotice', () => ({
  default: () => <div data-testid="timelendr-security-mock" />,
}))

vi.mock('@/components/product-landings/ProductDownloadRow', () => ({
  default: ({
    items,
  }: {
    items: Array<{ href: string; label: string; primary?: boolean }>
  }) => (
    <div data-testid="timelendr-downloads-mock">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </div>
  ),
}))

describe('TimelendrLandingClient (6B10)', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({
          success: true,
          data: [
            {
              id: 1,
              filePath: 'https://example.com/tl-win.exe',
              changelog: 'init',
              version: '1.2.0',
              platform: 'windows',
              createdAt: '2026-01-01',
            },
            {
              id: 2,
              filePath: 'https://example.com/tl-mac.dmg',
              changelog: 'init',
              version: '1.2.0',
              platform: 'macos',
              createdAt: '2026-01-01',
            },
          ],
        }),
      }),
    )
  })

  it('conserve marque, releases mockées et lien catalogue sans shell MUI', async () => {
    render(<TimelendrLandingClient />)

    expect(screen.getByTestId('timelendr-landing')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Time/)

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Windows/i })).toHaveAttribute(
        'href',
        'https://example.com/tl-win.exe',
      )
    })
    expect(screen.getByRole('link', { name: /macOS/i })).toHaveAttribute(
      'href',
      'https://example.com/tl-mac.dmg',
    )
    expect(
      screen.getByRole('link', { name: /autres logiciels|other software/i }),
    ).toHaveAttribute('href', '/portfolio/projets?type=logiciel')
    expect(screen.getByTestId('timelendr-carousel-mock')).toBeTruthy()
  })

  it('affiche noReleases quand l’API échoue', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('offline')),
    )

    render(<TimelendrLandingClient />)

    await waitFor(() => {
      expect(screen.queryByTestId('timelendr-downloads-mock')).toBeNull()
    })
    expect(screen.getByTestId('timelendr-landing').textContent).toMatch(
      /aucune version|no release|pas encore|not available/i,
    )
  })
})
