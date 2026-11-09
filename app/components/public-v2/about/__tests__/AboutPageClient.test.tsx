import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AboutPageClient from '../AboutPageClient'
import { ABOUT_PAGE_COPY, ABOUT_PAGE_SKILLS } from '@/lib/public-v2/aboutPageContent'

describe('AboutPageClient', () => {
  it('présente l’identité, la formation et les outils V1', () => {
    render(<AboutPageClient />)

    expect(screen.getByRole('heading', { level: 1, name: ABOUT_PAGE_COPY.title })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: ABOUT_PAGE_COPY.identityName })).toBeInTheDocument()
    expect(screen.getByText(ABOUT_PAGE_COPY.identityRole)).toBeInTheDocument()
    expect(screen.getByText(/ÉMICA/i)).toBeInTheDocument()
    expect(screen.getByText(/Maisonneuve/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: ABOUT_PAGE_COPY.toolsTitle })).toBeInTheDocument()
    for (const skill of ABOUT_PAGE_SKILLS) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it('conserve les trois paragraphes originaux du parcours', () => {
    render(<AboutPageClient />)

    expect(screen.getByRole('heading', { name: ABOUT_PAGE_COPY.storyTitle })).toBeInTheDocument()
    for (const paragraph of ABOUT_PAGE_COPY.storyParagraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
    expect(screen.getByText(/Survivant d'un AVC/i)).toBeInTheDocument()
    expect(screen.getByText(/père de deux enfants/i)).toBeInTheDocument()
  })

  it('expose les CTA Contact et Réalisations', () => {
    render(<AboutPageClient />)

    expect(screen.getByRole('link', { name: ABOUT_PAGE_COPY.ctaContact })).toHaveAttribute(
      'href',
      '/portfolio/contact',
    )
    expect(screen.getByRole('link', { name: ABOUT_PAGE_COPY.ctaProjects })).toHaveAttribute(
      'href',
      '/portfolio/projets',
    )
    expect(screen.getByRole('heading', { name: ABOUT_PAGE_COPY.ctaTitle })).toBeInTheDocument()
  })

  it('utilise le portrait temporaire Jf.jpg', () => {
    render(<AboutPageClient />)
    const img = screen.getByRole('img', { name: ABOUT_PAGE_COPY.portrait.alt })
    expect(img.getAttribute('src') || '').toMatch(/Jf\.jpg/)
  })
})
