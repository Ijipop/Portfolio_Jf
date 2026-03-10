import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import PageWrapper from '../PageWrapper'

const mockPathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

vi.mock('../../../contexts/AdvancedThemeContext', () => ({
  useAdvancedTheme: () => ({
    customTheme: { bg: '#f8fafc', bg2: '#ffffff' },
  }),
}))

describe('PageWrapper', () => {
  it('renders children on standard route', () => {
    mockPathname.mockReturnValue('/admin')
    render(
      <PageWrapper>
        <div>child-content</div>
      </PageWrapper>
    )
    expect(screen.getByText('child-content')).toBeInTheDocument()
  })

  it('renders children on topology route', () => {
    mockPathname.mockReturnValue('/portfolio')
    render(
      <PageWrapper>
        <div>topology-child</div>
      </PageWrapper>
    )
    expect(screen.getByText('topology-child')).toBeInTheDocument()
  })
})

