import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../theme/PublicThemeRoot'
import PublicHeader from '../PublicHeader'
import PublicFooter from '../PublicFooter'
import { getPublicV2NavItems } from '@/lib/public-v2/nav'

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
    onClick?: () => void
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

describe('public-v2 chrome', () => {
  it('Header et Footer partagent les mêmes destinations résolues', () => {
    const pathname = '/v2-design-preview'
    render(
      <PublicThemeRoot>
        <PublicHeader pathname={pathname} />
        <PublicFooter pathname={pathname} />
      </PublicThemeRoot>,
    )

    const expected = getPublicV2NavItems(pathname)
    for (const item of expected) {
      const links = screen.getAllByRole('link', { name: item.label })
      expect(links.length).toBeGreaterThanOrEqual(2)
      expect(links.every((l) => l.getAttribute('href') === item.href)).toBe(true)
    }
    expect(screen.getAllByRole('link', { name: 'Me contacter' }).length).toBeGreaterThanOrEqual(1)
    const brandLinks = screen.getAllByRole('link', { name: /Jean-François Lefebvre/i })
    expect(brandLinks.length).toBeGreaterThanOrEqual(1)
    expect(brandLinks.every((l) => l.getAttribute('href') === '#pv2-main')).toBe(true)
  })

  it('ferme le menu mobile avec Échap et restaure le focus', async () => {
    const user = userEvent.setup()
    render(
      <PublicThemeRoot>
        <PublicHeader pathname="/v2-design-preview" />
      </PublicThemeRoot>,
    )

    // jsdom n’expose pas toujours summary comme role=button — label accessible suffit.
    const summary = screen.getByLabelText('Menu de navigation')
    await user.click(summary)
    const details = summary.closest('details')
    expect(details).toHaveAttribute('open')

    await user.keyboard('{Escape}')
    expect(details).not.toHaveAttribute('open')
    expect(summary).toHaveFocus()
  })

  it('marque À propos comme page courante sur /portfolio/a-propos', () => {
    render(
      <PublicThemeRoot>
        <PublicHeader pathname="/portfolio/a-propos" />
      </PublicThemeRoot>,
    )
    const aboutLinks = screen.getAllByRole('link', { name: 'À propos' })
    expect(aboutLinks.some((l) => l.getAttribute('aria-current') === 'page')).toBe(true)
  })
})
