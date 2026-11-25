import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SupportPageClient from '../SupportPageClient'
import {
  SUPPORT_FORM_ANCHOR,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
} from '@/lib/public-v2/supportPageContent'
import { SUPPORT_EDITORIAL } from '@/lib/public-v2/supportEditorialContent'

vi.mock('@/components/support/SupportContactForm', () => ({
  default: function MockSupportContactForm() {
    return (
      <section id={SUPPORT_FORM_ANCHOR} data-testid="support-contact-form">
        Formulaire soutien mock
      </section>
    )
  },
}))

describe('SupportPageClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('présente hero éditorial, cinq domaines, process et ancre formulaire', () => {
    render(<SupportPageClient />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Un problème informatique/i,
      }),
    ).toBeInTheDocument()
    expect(screen.queryByAltText(/Portrait de Jean-François/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/sans script/i)).not.toBeInTheDocument()
    expect(screen.getByText(SUPPORT_EDITORIAL.hero.signatureName)).toBeInTheDocument()
    expect(screen.getByText(SUPPORT_EDITORIAL.services.domains[0].title)).toBeInTheDocument()
    expect(
      screen.getByText('Solutions informatiques pour organisations'),
    ).toBeInTheDocument()
    expect(screen.getByText(/Expression LaSalle/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: SUPPORT_EDITORIAL.process.title })).toBeInTheDocument()
    expect(screen.getByTestId('support-contact-form')).toBeInTheDocument()
    expect(document.getElementById(SUPPORT_FORM_ANCHOR)).toBeTruthy()
  })

  it('n’affiche plus de grille tarifs publique', () => {
    render(<SupportPageClient />)
    expect(screen.queryByText('Prix clairs')).not.toBeInTheDocument()
    expect(screen.queryByText(/Diagnostic à distance/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument()
    expect(screen.getByText(SUPPORT_EDITORIAL.pricingNote)).toBeInTheDocument()
  })

  it('expose téléphone et CTA vers #demande-soutien sans lien SMS public', () => {
    render(<SupportPageClient />)
    const call = screen.getAllByRole('link', {
      name: new RegExp(
        `${SUPPORT_EDITORIAL.hero.ctaCall}.*${SUPPORT_PHONE_DISPLAY.replace(/[()]/g, '\\$&')}`,
      ),
    })[0]
    expect(call).toHaveAttribute('href', SUPPORT_PHONE_HREF)
    expect(screen.getAllByRole('link', { name: new RegExp(SUPPORT_EDITORIAL.hero.ctaForm) })[0]).toHaveAttribute(
      'href',
      `#${SUPPORT_FORM_ANCHOR}`,
    )
    expect(document.querySelector('a[href^="sms:"]')).toBeNull()
  })
})