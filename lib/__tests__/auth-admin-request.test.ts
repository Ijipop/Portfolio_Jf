import jwt from 'jsonwebtoken'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { authAdminToken } from '../auth-admin-request'
import { makeNextRequest } from './helpers/http'

const TEST_SECRET = 'ijipop-v2-test-jwt-secret-not-production'

describe('authAdminToken', () => {
  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', TEST_SECRET)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('refuse une requête sans jeton', () => {
    const result = authAdminToken(makeNextRequest('/api/projects', { method: 'POST' }))
    expect(result).toEqual({
      ok: false,
      status: 401,
      error: "Token d'authentification requis",
    })
  })

  it('accepte un Bearer JWT valide', () => {
    const token = jwt.sign({ userId: 1, role: 'admin' }, TEST_SECRET, { expiresIn: '1h' })
    const result = authAdminToken(
      makeNextRequest('/api/projects', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      }),
    )
    expect(result.ok).toBe(true)
  })

  it('accepte le cookie adminToken', () => {
    const token = jwt.sign({ userId: 1, role: 'admin' }, TEST_SECRET, { expiresIn: '1h' })
    const result = authAdminToken(
      makeNextRequest('/api/projects', {
        method: 'POST',
        cookies: { adminToken: token },
      }),
    )
    expect(result.ok).toBe(true)
  })

  it('refuse un jeton invalide', () => {
    const result = authAdminToken(
      makeNextRequest('/api/projects', {
        method: 'POST',
        cookies: { adminToken: 'not-a-jwt' },
      }),
    )
    expect(result).toEqual({
      ok: false,
      status: 401,
      error: 'Token invalide ou expiré',
    })
  })

  it('refuse un jeton signé avec un autre secret', () => {
    const token = jwt.sign({ userId: 1 }, 'autre-secret-de-test', { expiresIn: '1h' })
    const result = authAdminToken(
      makeNextRequest('/api/projects', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      }),
    )
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.status).toBe(401)
  })

  it('refuse un jeton expiré', () => {
    const token = jwt.sign(
      { userId: 1, exp: Math.floor(Date.now() / 1000) - 30 },
      TEST_SECRET,
    )
    const result = authAdminToken(
      makeNextRequest('/api/projects', {
        method: 'POST',
        cookies: { adminToken: token },
      }),
    )
    expect(result).toEqual({
      ok: false,
      status: 401,
      error: 'Token invalide ou expiré',
    })
  })

  it('signale JWT_SECRET manquant', () => {
    vi.stubEnv('JWT_SECRET', '')
    const token = jwt.sign({ userId: 1 }, TEST_SECRET, { expiresIn: '1h' })
    const result = authAdminToken(
      makeNextRequest('/api/projects', {
        method: 'POST',
        cookies: { adminToken: token },
      }),
    )
    expect(result).toEqual({
      ok: false,
      status: 500,
      error: 'JWT_SECRET non configuré.',
    })
  })
})
