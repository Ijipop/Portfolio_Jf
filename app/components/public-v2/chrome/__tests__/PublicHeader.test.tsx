import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../../theme/PublicThemeRoot'
import PublicChromeI18n from '../PublicChromeI18n'
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

function renderChrome(ui: React.ReactNode) {
  return render(
    <PublicThemeRoot>
      <PublicChromeI18n>{ui}</PublicChromeI18n>
    </PublicThemeRoot>,
  )
}

describe('public-v2 chrome', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('Header et Footer partagent les mêmes destinations résolues', () => {
    const pathname = '/v2-design-preview'
    renderChrome(
      <>
        <PublicHeader pathname={pathname} />
        <PublicFooter pathname={pathname} />
      </>,
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
    renderChrome(<PublicHeader pathname="/v2-design-preview" />)

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
    renderChrome(<PublicHeader pathname="/portfolio/a-propos" />)
    const aboutLinks = screen.getAllByRole('link', { name: 'À propos' })
    expect(aboutLinks.some((l) => l.getAttribute('aria-current') === 'page')).toBe(true)
  })

  it('n’expose pas le sélecteur FR/EN tant que le flag est off', () => {
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', 'false')
    renderChrome(<PublicHeader pathname="/" />)
    expect(screen.queryByTestId('pv2-locale-toggle')).toBeNull()
    expect(screen.getAllByRole('link', { name: 'Réalisations' }).length).toBeGreaterThanOrEqual(1)
  })

  it('expose le sélecteur FR/EN et bascule les labels quand le flag est on', async () => {
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', 'true')
    const user = userEvent.setup()
    renderChrome(<PublicHeader pathname="/" />)

    expect(screen.getByTestId('pv2-locale-toggle')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getAllByRole('link', { name: 'Work' }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('link', { name: 'Contact me' }).length).toBeGreaterThanOrEqual(1)
  })

  it('place FR/EN à droite du CTA Me contacter quand le flag est on', () => {
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', 'true')
    window.localStorage.setItem('portfolio-locale', 'fr')
    const { container } = renderChrome(<PublicHeader pathname="/" />)
    const trailing = container.querySelector('[class*="trailing"]')
    expect(trailing).toBeTruthy()
    const toggle = trailing!.querySelector('[data-testid="pv2-locale-toggle"]')
    const cta = trailing!.querySelector('a[class*="desktopCta"]')
    expect(toggle).toBeTruthy()
    expect(cta).toBeTruthy()
    expect(cta!.compareDocumentPosition(toggle!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})
