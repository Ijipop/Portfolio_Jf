import { describe, expect, it } from 'vitest'
import { NAV_ROUTES } from '../navRoutes'

describe('NAV_ROUTES', () => {
  it('contains all expected route ids', () => {
    const ids = NAV_ROUTES.map((r) => r.id)
    expect(ids).toEqual(['home', 'projects', 'software', 'about', 'support', 'contact'])
  })

  it('marks active route correctly', () => {
    const home = NAV_ROUTES.find((r) => r.id === 'home')
    const projects = NAV_ROUTES.find((r) => r.id === 'projects')
    const software = NAV_ROUTES.find((r) => r.id === 'software')
    const support = NAV_ROUTES.find((r) => r.id === 'support')
    const contact = NAV_ROUTES.find((r) => r.id === 'contact')

    expect(home?.path).toBe('/')
    expect(home?.isActive('/')).toBe(true)
    expect(home?.isActive('/portfolio')).toBe(false)
    expect(home?.isActive('/portfolio/projets')).toBe(false)
    expect(projects?.isActive('/portfolio/projets')).toBe(true)
    expect(projects?.isActive('/portfolio/projets', 'type=web')).toBe(true)
    expect(projects?.isActive('/portfolio/projets', 'type=logiciel')).toBe(false)
    expect(projects?.isActive('/logiciel')).toBe(false)
    expect(software?.path).toBe('/portfolio/projets?type=logiciel')
    expect(software?.isActive('/portfolio/projets', 'type=logiciel')).toBe(true)
    expect(software?.isActive('/logiciel')).toBe(true)
    expect(software?.isActive('/logiciel/timelendr')).toBe(true)
    expect(software?.isActive('/cpu-ze')).toBe(true)
    expect(software?.isActive('/spacetaker')).toBe(true)
    expect(software?.isActive('/portfolio/projets')).toBe(false)
    expect(support?.isActive('/soutien-informatique-montreal')).toBe(true)
    expect(support?.isActive('/portfolio/contact')).toBe(false)
    expect(contact?.isActive('/portfolio/contact')).toBe(true)
  })
})
