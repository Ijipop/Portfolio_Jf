import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BlueprintBars from '../BlueprintBars'

describe('BlueprintBars', () => {
  it('rend un chrome aria-hidden pour chaque kind', () => {
    for (const kind of ['title', 'text', 'card', 'ticks'] as const) {
      const { container, unmount } = render(<BlueprintBars kind={kind} mark="TYPE" />)
      const root = container.querySelector('[data-blueprint]')
      expect(root).toBeTruthy()
      expect(root).toHaveAttribute('aria-hidden')
      unmount()
    }
  })

  it('n’injecte pas de copy éditorial', () => {
    const { container } = render(<BlueprintBars kind="title" mark="META" />)
    expect(container.textContent?.replace(/\s+/g, '')).toBe('META')
  })
})
