import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import React from 'react'
import AppBarComponent from '../appBar'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/portfolio',
}))

vi.mock('../../hooks/useThemeColors', () => ({
  useThemeColors: () => ({ primary: '#1e3a8a', secondary: '#059669' }),
}))

vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    locale: 'fr',
    setLocale: vi.fn(),
    t: (key: string) =>
      ({
        'nav.portfolio': 'Portfolio',
        'nav.home': 'Accueil',
        'nav.projects': 'Projets',
        'nav.software': 'Logiciel',
        'nav.webSites': 'Sites web',
        'nav.about': 'À propos',
        'nav.contact': 'Contact',
        'nav.admin': 'Admin',
      }[key] ?? key),
  }),
}))

vi.mock('../ThemeSelector', () => ({
  ThemeSelector: () => <div data-testid="theme-selector" />,
}))

vi.mock('../LoginModal', () => ({
  default: () => null,
}))

describe('AppBarComponent', () => {
  beforeEach(() => {
    pushMock.mockReset()
  })

  it('renders core navigation labels', () => {
    render(<AppBarComponent />)
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Projets')).toBeInTheDocument()
    expect(screen.getByText('Logiciel')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('navigates to /portfolio when Accueil is clicked', () => {
    render(<AppBarComponent />)
    fireEvent.click(screen.getByText('Accueil'))
    expect(pushMock).toHaveBeenCalledWith('/portfolio')
  })
})

