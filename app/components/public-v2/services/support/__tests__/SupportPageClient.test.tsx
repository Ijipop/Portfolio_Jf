import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SupportPageClient from '../SupportPageClient'
import {
  SUPPORT_FORM_ANCHOR,
  SUPPORT_PAGE_COPY,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
} from '@/lib/public-v2/supportPageContent'

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

  it('présente identité, piliers, prix et ancre formulaire', () => {
    render(<SupportPageClient />)
    expect(screen.getByRole('heading', { level: 1, name: SUPPORT_PAGE_COPY.h1 })).toBeInTheDocument()
    expect(screen.getByText(SUPPORT_PAGE_COPY.identityName)).toBeInTheDocument()
    expect(screen.getByText(SUPPORT_PAGE_COPY.pillars[0].title)).toBeInTheDocument()
    expect(screen.getByText(SUPPORT_PAGE_COPY.prices[0].service)).toBeInTheDocument()
    expect(screen.getByTestId('support-contact-form')).toBeInTheDocument()
    expect(document.getElementById(SUPPORT_FORM_ANCHOR)).toBeTruthy()
  })

  it('expose téléphone, SMS et CTA vers #demande-soutien', () => {
    render(<SupportPageClient />)
    const call = screen.getAllByRole('link', {
      name: new RegExp(`${SUPPORT_PAGE_COPY.ctaCall}.*${SUPPORT_PHONE_DISPLAY.replace(/[()]/g, '\\$&')}`),
    })[0]
    expect(call).toHaveAttribute('href', SUPPORT_PHONE_HREF)
    expect(screen.getAllByRole('link', { name: SUPPORT_PAGE_COPY.ctaPrimary })[0]).toHaveAttribute(
      'href',
      `#${SUPPORT_FORM_ANCHOR}`,
    )
  })
})
