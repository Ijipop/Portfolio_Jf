import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const pathnameMock = vi.fn(() => '/admin')

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameMock(),
}))

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}))

import ContactFab from '../ContactFab'

describe('ContactFab isolation admin', () => {
  it('ne rend rien sur /admin', () => {
    pathnameMock.mockReturnValue('/admin')
    const { container } = render(<ContactFab />)
    expect(container).toBeEmptyDOMElement()
  })

  it('ne rend rien sur /admin/dashboard', () => {
    pathnameMock.mockReturnValue('/admin/dashboard')
    const { container } = render(<ContactFab />)
    expect(container).toBeEmptyDOMElement()
  })

  it('reste visible hors admin et hors chemins déjà masqués', () => {
    pathnameMock.mockReturnValue('/logiciel')
    render(<ContactFab />)
    expect(screen.getByRole('link', { name: 'nav.contact' })).toBeInTheDocument()
  })
})
