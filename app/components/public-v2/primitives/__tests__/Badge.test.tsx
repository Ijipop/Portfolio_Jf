import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Badge from '../Badge/Badge'
import PublicThemeRoot from '../../theme/PublicThemeRoot'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

describe('public-v2 Badge', () => {
  it('rend chaque variante', () => {
    render(
      <PublicThemeRoot>
        <Badge variant="neutral">N</Badge>
        <Badge variant="accent">A</Badge>
        <Badge variant="success">S</Badge>
        <Badge variant="personal">P</Badge>
      </PublicThemeRoot>,
    )
    expect(screen.getByText('N')).toHaveAttribute('data-pv2-badge', 'neutral')
    expect(screen.getByText('A')).toHaveAttribute('data-pv2-badge', 'accent')
    expect(screen.getByText('S')).toHaveAttribute('data-pv2-badge', 'success')
    expect(screen.getByText('P')).toHaveAttribute('data-pv2-badge', 'personal')
  })
})
