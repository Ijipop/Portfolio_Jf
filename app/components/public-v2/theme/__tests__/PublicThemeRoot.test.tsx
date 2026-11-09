import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '../PublicThemeRoot'
import { publicV2MotionStyle } from '@/lib/public-v2/motion'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

describe('PublicThemeRoot', () => {
  it('applique data-public-theme="pop-atelier"', () => {
    render(
      <PublicThemeRoot>
        <span>enfant</span>
      </PublicThemeRoot>,
    )
    const root = screen.getByTestId('public-theme-root')
    expect(root).toHaveAttribute('data-public-theme', 'pop-atelier')
    expect(screen.getByText('enfant')).toBeInTheDocument()
  })

  it('injecte les CSS vars motion quand speedScale change', () => {
    const style = publicV2MotionStyle({ speedScale: 0.5 })
    expect(style).toMatchObject({
      '--dur-fast': '90ms',
      '--dur-med': '210ms',
    })
  })
})
