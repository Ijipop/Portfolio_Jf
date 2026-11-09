import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PROJECTS_COPY } from '@/lib/public-v2/projectsContent'
import { PROJECTS_FIXTURES, TIMELENDR_FIXTURES } from '@/lib/public-v2/projectsFixtures'
import ProjectCard from '../ProjectCard'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode
    href: string
    className?: string
    onClick?: (e: React.MouseEvent) => void
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

function renderCard(
  project: (typeof PROJECTS_FIXTURES)[number],
  variant: 'web' | 'logiciel' = 'web',
) {
  const onNavigate = vi.fn()
  render(
    <PublicThemeRoot>
      <ProjectCard
        project={project}
        variant={variant}
        onNavigate={onNavigate}
        timelendrWindowsUrl={TIMELENDR_FIXTURES.windowsUrl}
        timelendrMacosUrl={TIMELENDR_FIXTURES.macosUrl}
      />
    </PublicThemeRoot>,
  )
  return onNavigate
}

describe('ProjectCard V2', () => {
  it('expose Lire la suite pour une description longue et conserve le texte', () => {
    const long = PROJECTS_FIXTURES.find((p) => p.id === 101)!
    renderCard(long, 'web')
    expect(screen.getByRole('button', { name: PROJECTS_COPY.readMore })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: PROJECTS_COPY.readMore }))
    expect(screen.getByRole('button', { name: PROJECTS_COPY.readLess })).toBeInTheDocument()
    expect(screen.getByText(/Texte long volontaire/)).toBeInTheDocument()
  })

  it('affiche une zone média même sans imageUrl', () => {
    const noImg = PROJECTS_FIXTURES.find((p) => p.id === 103)!
    renderCard(noImg, 'web')
    const card = screen.getByTestId('pv2-project-103')
    expect(card.querySelector('[aria-hidden="true"]')).toBeTruthy()
    expect(card.textContent).toContain('W')
  })

  it('ne duplique pas un téléchargement Windows identique au CTA primaire', () => {
    const desk = PROJECTS_FIXTURES.find((p) => p.id === 201)!
    renderCard(desk, 'logiciel')
    expect(screen.getByRole('link', { name: PROJECTS_COPY.viewProject })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: PROJECTS_COPY.downloadWindows })).not.toBeInTheDocument()
  })

  it('conserve Windows et macOS distincts pour Timelendr', () => {
    const tl = PROJECTS_FIXTURES.find((p) => p.id === 202)!
    renderCard(tl, 'logiciel')
    expect(screen.getByRole('link', { name: PROJECTS_COPY.downloadTimelendrPc })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: PROJECTS_COPY.downloadTimelendrMacos })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: PROJECTS_COPY.downloadTimelendrPc })).toHaveTextContent('Windows')
    expect(screen.getByRole('link', { name: PROJECTS_COPY.downloadTimelendrMacos })).toHaveTextContent('macOS')
  })

  it('n’offre pas d’action pour un logiciel planifié sans téléchargement', () => {
    const planned = PROJECTS_FIXTURES.find((p) => p.id === 204)!
    renderCard(planned, 'logiciel')
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText(PROJECTS_COPY.statusPlanifie)).toBeInTheDocument()
  })
})
