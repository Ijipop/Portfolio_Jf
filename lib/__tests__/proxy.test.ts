import { describe, expect, it } from 'vitest'
import { proxy } from '../../proxy'
import { makeNextRequest } from './helpers/http'

describe('proxy', () => {
  it('laisse passer GET /api/projects sans jeton', () => {
    const response = proxy(makeNextRequest('/api/projects'))
    expect(response.status).not.toBe(401)
    expect(response.headers.get('location')).toBeNull()
  })

  it('laisse passer la page de connexion /admin sans jeton', () => {
    const response = proxy(makeNextRequest('/admin'))
    expect(response.status).not.toBe(401)
    expect(response.headers.get('location')).toBeNull()
  })

  it('redirige /admin/dashboard sans jeton vers /admin', () => {
    const response = proxy(makeNextRequest('/admin/dashboard'))
    expect(response.status).toBeGreaterThanOrEqual(300)
    expect(response.status).toBeLessThan(400)
    expect(response.headers.get('location')).toBe('http://localhost:3000/admin')
  })

  it('refuse POST /api/projects sans jeton', async () => {
    const response = proxy(makeNextRequest('/api/projects', { method: 'POST', body: {} }))
    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ success: false, error: 'Non autorisé' })
  })

  it('refuse POST /api/upload sans jeton', async () => {
    const response = proxy(makeNextRequest('/api/upload', { method: 'POST' }))
    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toMatchObject({ success: false })
  })

  it('laisse passer une mutation si un jeton est présent (contrôle de présence seulement)', () => {
    const response = proxy(
      makeNextRequest('/api/projects', {
        method: 'POST',
        body: {},
        cookies: { adminToken: 'presence-only-not-verified' },
      }),
    )
    expect(response.status).not.toBe(401)
  })

  it('laisse passer /admin/dashboard si un jeton est présent', () => {
    const response = proxy(
      makeNextRequest('/admin/dashboard', {
        cookies: { adminToken: 'presence-only-not-verified' },
      }),
    )
    expect(response.headers.get('location')).toBeNull()
  })
})
