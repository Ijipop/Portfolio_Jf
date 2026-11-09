import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Heading from '../Heading/Heading'
import PublicThemeRoot from '../../theme/PublicThemeRoot'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

describe('public-v2 Heading', () => {
  it('sépare niveau HTML et variante visuelle', () => {
    render(
      <PublicThemeRoot>
        <Heading as="h1" variant="display">
          Titre display
        </Heading>
        <Heading as="h3" variant="card">
          Titre card
        </Heading>
      </PublicThemeRoot>,
    )
    const display = screen.getByRole('heading', { level: 1, name: 'Titre display' })
    const card = screen.getByRole('heading', { level: 3, name: 'Titre card' })
    expect(display).toHaveAttribute('data-pv2-heading', 'display')
    expect(card).toHaveAttribute('data-pv2-heading', 'card')
  })
})
