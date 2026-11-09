import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Container from '../Container/Container'
import PublicThemeRoot from '../../theme/PublicThemeRoot'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

describe('public-v2 Container', () => {
  it('expose content et wide via data attribute', () => {
    render(
      <PublicThemeRoot>
        <Container variant="content">Contenu</Container>
        <Container variant="wide">Large</Container>
      </PublicThemeRoot>,
    )
    expect(screen.getByText('Contenu').closest('[data-pv2-container]')).toHaveAttribute(
      'data-pv2-container',
      'content',
    )
    expect(screen.getByText('Large').closest('[data-pv2-container]')).toHaveAttribute(
      'data-pv2-container',
      'wide',
    )
  })
})
