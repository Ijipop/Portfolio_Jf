import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useLanguage } from '@/contexts/LanguageContext'
import PublicChromeI18n from '@/components/public-v2/chrome/PublicChromeI18n'
import SupportFormMuiIsland from '../SupportFormMuiIsland'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

function LocaleProbe() {
  const { locale } = useLanguage()
  return <span data-testid="locale-probe">{locale}</span>
}

describe('SupportFormMuiIsland locale inheritance', () => {
  it('hérite du chrome FR quand le flag est off malgré localStorage=en', () => {
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', 'false')
    window.localStorage.setItem('portfolio-locale', 'en')
    render(
      <PublicChromeI18n>
        <SupportFormMuiIsland>
          <LocaleProbe />
        </SupportFormMuiIsland>
      </PublicChromeI18n>,
    )
    expect(screen.getByTestId('locale-probe')).toHaveTextContent('fr')
    vi.unstubAllEnvs()
  })
})
