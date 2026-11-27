import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PROJECTS_COPY, PROJECTS_COPY_EN } from '@/lib/public-v2/projectsContent'
import IjipopWorkLoader from '../IjipopWorkLoader'
import LocalizedBusy from '../LocalizedBusy'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

vi.mock('@/lib/public-v2/usePublicV2Locale', () => ({
  usePublicV2Locale: () => 'fr' as const,
}))

describe('IjipopWorkLoader', () => {
  it('rend le moniteur et le libellé fourni', () => {
    render(
      <PublicThemeRoot>
        <IjipopWorkLoader label={PROJECTS_COPY.loading} />
      </PublicThemeRoot>,
    )
    expect(screen.getByTestId('pv2-ijipop-work-loader')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText(PROJECTS_COPY.loading)).toBeInTheDocument()
  })

  it('LocalizedBusy projects réutilise le même loader', () => {
    render(
      <PublicThemeRoot>
        <LocalizedBusy kind="projects" />
      </PublicThemeRoot>,
    )
    expect(screen.getByTestId('pv2-busy-projects')).toBeInTheDocument()
    expect(screen.getByText(PROJECTS_COPY.loading)).toBeInTheDocument()
  })

  it('expose le libellé EN quand fourni', () => {
    render(
      <PublicThemeRoot>
        <IjipopWorkLoader label={PROJECTS_COPY_EN.loading} testId="pv2-busy-projects" />
      </PublicThemeRoot>,
    )
    expect(screen.getByText(PROJECTS_COPY_EN.loading)).toBeInTheDocument()
  })
})
