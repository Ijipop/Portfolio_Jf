import bcrypt from 'bcryptjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeNextRequest } from '../../../../../lib/__tests__/helpers/http'
import { POST } from '../route'

const TEST_SECRET = 'ijipop-v2-test-jwt-secret-not-production'

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

let ipCounter = 50
function uniqueIp(): string {
  ipCounter += 1
  return `192.0.2.${ipCounter}`
}

describe('POST /api/auth/login', { timeout: 15_000 }, () => {
  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', TEST_SECRET)
    prismaMock.user.findUnique.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('refuse une requête sans email/mot de passe', async () => {
    const response = await POST(
      makeNextRequest('/api/auth/login', {
        method: 'POST',
        body: {},
        headers: { 'x-forwarded-for': uniqueIp() },
      }),
    )
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ message: 'Email et mot de passe requis' })
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
  })

  it('refuse un compte inconnu sans toucher une vraie base', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    const response = await POST(
      makeNextRequest('/api/auth/login', {
        method: 'POST',
        body: { email: 'nobody@example.com', password: 'wrong' },
        headers: { 'x-forwarded-for': uniqueIp() },
      }),
    )
    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ message: 'Email ou mot de passe incorrect' })
  })

  it('pose le cookie adminToken après un mot de passe bcrypt valide', async () => {
    const passwordHash = await bcrypt.hash('test-password-not-real', 4)
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'admin@example.com',
      name: 'Admin Test',
      role: 'admin',
      password: passwordHash,
    })
    const response = await POST(
      makeNextRequest('/api/auth/login', {
        method: 'POST',
        body: { email: 'admin@example.com', password: 'test-password-not-real' },
        headers: { 'x-forwarded-for': uniqueIp() },
      }),
    )
    const json = await response.json()
    expect(response.status).toBe(200)
    expect(json.message).toBe('Connexion réussie')
    expect(json.user).toEqual({
      id: 1,
      email: 'admin@example.com',
      name: 'Admin Test',
      role: 'admin',
    })
    expect(json.token).toEqual(expect.any(String))
    const setCookie = response.headers.get('set-cookie') ?? ''
    expect(setCookie).toContain('adminToken=')
  })
})
