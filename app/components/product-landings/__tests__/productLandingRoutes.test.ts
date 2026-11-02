import { describe, expect, it } from 'vitest'
import { isProductLandingRoute } from '../productLandingRoutes'

describe('isProductLandingRoute', () => {
  it('reconnaît CPU-ZE, Space Taker, DeskDot, Traducteur et Timelendr', () => {
    expect(isProductLandingRoute('/cpu-ze')).toBe(true)
    expect(isProductLandingRoute('/cpu-ze/merci')).toBe(true)
    expect(isProductLandingRoute('/spacetaker')).toBe(true)
    expect(isProductLandingRoute('/deskdot')).toBe(true)
    expect(isProductLandingRoute('/traducteur')).toBe(true)
    expect(isProductLandingRoute('/logiciel/timelendr')).toBe(true)
    expect(isProductLandingRoute('/logiciel/timelendr/merci')).toBe(true)
  })

  it('ne traite pas le catalogue ni l’admin comme landings produit', () => {
    expect(isProductLandingRoute('/portfolio/projets')).toBe(false)
    expect(isProductLandingRoute('/space-taker')).toBe(false)
    expect(isProductLandingRoute('/logiciel/timelendar')).toBe(false)
    expect(isProductLandingRoute('/admin')).toBe(false)
    expect(isProductLandingRoute(null)).toBe(false)
  })
})
