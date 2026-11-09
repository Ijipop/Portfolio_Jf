import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PROJECTS_COPY } from '@/lib/public-v2/projectsContent'
import {
  PROJECTS_FIXTURES,
  TIMELENDR_FIXTURES,
  fixturesSoftware,
  fixturesWebProfessional,
} from '@/lib/public-v2/projectsFixtures'
import ProjectsCatalog from '../ProjectsCatalog'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

const replace = vi.fn()
const push = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => '/portfolio/projets',
  useRouter: () => ({ replace, push }),
  useSearchParams: () => new URLSearchParams(),
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

describe('ProjectsCatalog V2', () => {
  it('affiche les mandats clients web par défaut depuis les fixtures', () => {
    render(
      <PublicThemeRoot>
        <ProjectsCatalog initialProjects={PROJECTS_FIXTURES} initialTimelendr={TIMELENDR_FIXTURES} />
      </PublicThemeRoot>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(PROJECTS_COPY.title)
    expect(screen.getByText('Atelier Nordique')).toBeInTheDocument()
    expect(screen.queryByText('Carnet personnel')).not.toBeInTheDocument()
    expect(screen.queryByText('DeskDot')).not.toBeInTheDocument()
  })

  it('bascule vers logiciels et met à jour l’URL ?type=', () => {
    render(
      <PublicThemeRoot>
        <ProjectsCatalog initialProjects={PROJECTS_FIXTURES} initialTimelendr={TIMELENDR_FIXTURES} />
      </PublicThemeRoot>,
    )

    fireEvent.click(screen.getByRole('button', { name: PROJECTS_COPY.typeSoftware }))
    expect(push).toHaveBeenCalledWith('/portfolio/projets?type=logiciel', { scroll: false })
    expect(screen.getByText('DeskDot')).toBeInTheDocument()
    expect(screen.getByText('Timelendr')).toBeInTheDocument()
  })

  it('ne fetch pas les API lorsque les fixtures sont fournies', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(
      <PublicThemeRoot>
        <ProjectsCatalog initialProjects={PROJECTS_FIXTURES} initialTimelendr={TIMELENDR_FIXTURES} />
      </PublicThemeRoot>,
    )
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('filtre les projets personnels via l’onglet audience', () => {
    render(
      <PublicThemeRoot>
        <ProjectsCatalog initialProjects={PROJECTS_FIXTURES} initialTimelendr={TIMELENDR_FIXTURES} />
      </PublicThemeRoot>,
    )
    fireEvent.click(screen.getByRole('button', { name: PROJECTS_COPY.audiencePersonal }))
    expect(screen.getByText('Carnet personnel')).toBeInTheDocument()
    expect(screen.queryByText('Atelier Nordique')).not.toBeInTheDocument()
  })

  it('montre l’état erreur sans inventer de projets', () => {
    render(
      <PublicThemeRoot>
        <ProjectsCatalog forceError={PROJECTS_COPY.errorLoad} skipFetch />
      </PublicThemeRoot>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent(PROJECTS_COPY.errorLoad)
    expect(screen.queryByTestId(/pv2-project-/)).toBeNull()
  })

  it('la route publique n’embarque pas les fixtures', () => {
    const page = readFileSync(
      path.join(process.cwd(), 'app/(site-pages)/portfolio/projets/page.tsx'),
      'utf8',
    )
    expect(page).toMatch(/ProjectsCatalog/)
    expect(page).not.toMatch(/PROJECTS_FIXTURES|initialProjects/)
    expect(page).toMatch(/PublicChromeShell/)
  })

  it.each([1, 2, 3, 4, 5, 6, 7] as const)(
    'rend %s mandat(s) web professionnel(s) sans erreur',
    (count) => {
      const slice = fixturesWebProfessional(count)
      expect(slice).toHaveLength(count)
      render(
        <PublicThemeRoot>
          <ProjectsCatalog initialProjects={slice} initialTimelendr={TIMELENDR_FIXTURES} />
        </PublicThemeRoot>,
      )
      expect(screen.getAllByTestId(/pv2-project-/)).toHaveLength(count)
    },
  )

  it('rend une grille logiciels avec plateformes et planifié sans lien', () => {
    const slice = fixturesSoftware(5)
    render(
      <PublicThemeRoot>
        <ProjectsCatalog initialProjects={slice} initialTimelendr={TIMELENDR_FIXTURES} />
      </PublicThemeRoot>,
    )
    fireEvent.click(screen.getByRole('button', { name: PROJECTS_COPY.typeSoftware }))
    expect(screen.getByText('DeskDot')).toBeInTheDocument()
    expect(screen.getByText('Aide-mémoire')).toBeInTheDocument()
    expect(screen.getByText('Dual Pack')).toBeInTheDocument()
  })
})
