import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ContactPageClient from '../ContactPageClient'
import { CONTACT_PAGE_COPY } from '@/lib/public-v2/contactPageContent'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}))

vi.mock('@/components/public-v2/contact/ContactFormV2', () => ({
  default: () => <form data-testid="contact-form-mock" />,
}))

describe('ContactPageClient — SMS publics', () => {
  it('masque Texter et propose M’écrire vers le formulaire', () => {
    render(<ContactPageClient />)
    expect(screen.queryByRole('link', { name: CONTACT_PAGE_COPY.smsCta })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: CONTACT_PAGE_COPY.writeCta })).toHaveAttribute(
      'href',
      CONTACT_PAGE_COPY.writeCtaHref,
    )
    expect(screen.getByRole('link', { name: new RegExp(CONTACT_PAGE_COPY.phoneCta) })).toHaveAttribute(
      'href',
      CONTACT_PAGE_COPY.phoneHref,
    )
  })
})