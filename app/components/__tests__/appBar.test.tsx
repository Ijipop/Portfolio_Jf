import { render, screen } from '@testing-library/react'
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
        'nav.about': 'À propos',
        'nav.contact': 'Contact',
        'nav.admin': 'Admin',
        'nav.presentationBeige': 'Site',
        'nav.presentationDev': 'Créa',
        'nav.presentationBeigeHint': '',
        'nav.presentationDevHint': '',
        'nav.presentationToggleGroup': '',
      }[key] ?? key),
  }),
}))

vi.mock('../../contexts/PresentationModeContext', () => ({
  usePresentationMode: () => ({
    mode: 'dev' as const,
    setMode: vi.fn(),
    hydrated: true,
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
    expect(screen.getByText('À propos')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders Accueil as a link to /portfolio', () => {
    render(<AppBarComponent />)
    const homeLink = screen.getByText('Accueil').closest('a')
    expect(homeLink).toHaveAttribute('href', '/portfolio')
  })
})

