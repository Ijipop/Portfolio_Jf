import { describe, expect, it } from 'vitest'
import {
  PROJECTS_COPY,
  getProjectsCopy,
  normalizeStatusLabel,
} from '../projectsContent'

describe('public-v2 projectsContent i18n', () => {
  it('returns English copy for en locale', () => {
    expect(getProjectsCopy('en').title).toBe('Projects')
    expect(getProjectsCopy('en').eyebrow).toBe('Work')
  })

  it('defaults French copy to PROJECTS_COPY', () => {
    expect(getProjectsCopy('fr')).toBe(PROJECTS_COPY)
    expect(getProjectsCopy().title).toBe(PROJECTS_COPY.title)
  })

  it('normalizeStatusLabel uses locale-specific status labels', () => {
    expect(normalizeStatusLabel('termine', 'fr')).toBe(PROJECTS_COPY.statusTermine)
    expect(normalizeStatusLabel('termine', 'en')).toBe('Completed')
    expect(normalizeStatusLabel('wip')).toBe(PROJECTS_COPY.statusWip)
  })
})