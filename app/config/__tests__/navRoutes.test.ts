import { describe, expect, it } from 'vitest'
import { NAV_ROUTES } from '../navRoutes'

describe('NAV_ROUTES', () => {
  it('contains all expected route ids', () => {
    const ids = NAV_ROUTES.map((r) => r.id)
    expect(ids).toEqual(['home', 'projects', 'software', 'websites', 'about', 'contact'])
  })

  it('marks active route correctly', () => {
    const home = NAV_ROUTES.find((r) => r.id === 'home')
    const software = NAV_ROUTES.find((r) => r.id === 'software')
    const contact = NAV_ROUTES.find((r) => r.id === 'contact')

    expect(home?.isActive('/portfolio')).toBe(true)
    expect(home?.isActive('/portfolio/projets')).toBe(false)
    expect(software?.isActive('/logiciel')).toBe(true)
    expect(software?.isActive('/logiciel/timelendar')).toBe(true)
    expect(contact?.isActive('/portfolio/contact')).toBe(true)
  })
})

