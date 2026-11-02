import jwt from 'jsonwebtoken'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeNextRequest } from '../../../../lib/__tests__/helpers/http'
import { GET, POST } from '../route'

const TEST_SECRET = 'ijipop-v2-test-jwt-secret-not-production'

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    project: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

const validProjectBody = {
  name: 'Space Taker Test',
  description: 'Outil de test isolé',
  technologies: 'Rust, Tauri',
  status: 'publié',
  url: '/spacetaker',
  siteUrl: '',
  downloadUrl: '',
  windowsUrl: 'https://example.com/space-taker.exe',
  macosUrl: 'https://example.com/space-taker.dmg',
  imageUrl: '/images/space-taker.png',
  projectType: 'logiciel',
  displayOrder: 2,
  webAudience: 'personal',
}

function adminRequest(path: string, init: Parameters<typeof makeNextRequest>[1] = {}) {
  const token = jwt.sign({ userId: 1, role: 'admin' }, TEST_SECRET, { expiresIn: '1h' })
  return makeNextRequest(path, {
    ...init,
    cookies: { ...init.cookies, adminToken: token },
    headers: { ...init.headers, authorization: `Bearer ${token}` },
  })
}

describe('/api/projects', { timeout: 15_000 }, () => {
  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', TEST_SECRET)
    prismaMock.project.findMany.mockReset()
    prismaMock.project.create.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('GET public retourne la liste Prisma mockée', async () => {
    prismaMock.project.findMany.mockResolvedValue([{ id: 1, name: 'CPU-ZE' }])
    const response = await GET(makeNextRequest('/api/projects'))
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.data).toEqual([{ id: 1, name: 'CPU-ZE' }])
    expect(prismaMock.project.findMany).toHaveBeenCalledOnce()
    const select = prismaMock.project.findMany.mock.calls[0]?.[0]?.select as Record<string, boolean>
    expect(select.createdAt).toBeUndefined()
  })

  it('GET admin inclut createdAt/updatedAt quand adminToken est présent', async () => {
    prismaMock.project.findMany.mockResolvedValue([])
    await GET(adminRequest('/api/projects', { method: 'GET' }))
    const select = prismaMock.project.findMany.mock.calls[0]?.[0]?.select as Record<string, boolean>
    expect(select.createdAt).toBe(true)
    expect(select.updatedAt).toBe(true)
  })

  it('POST refuse une mutation sans authentification', async () => {
    const response = await POST(makeNextRequest('/api/projects', { method: 'POST', body: validProjectBody }))
    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Token d'authentification requis",
    })
    expect(prismaMock.project.create).not.toHaveBeenCalled()
  })

  it('POST refuse un jeton expiré', async () => {
    const token = jwt.sign({ userId: 1, exp: Math.floor(Date.now() / 1000) - 60 }, TEST_SECRET)
    const response = await POST(
      makeNextRequest('/api/projects', {
        method: 'POST',
        body: validProjectBody,
        cookies: { adminToken: token },
      }),
    )
    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Token invalide ou expiré',
    })
    expect(prismaMock.project.create).not.toHaveBeenCalled()
  })

  it('POST refuse un nom vide', async () => {
    const response = await POST(adminRequest('/api/projects', { method: 'POST', body: { ...validProjectBody, name: '  ' } }))
    expect(response.status).toBe(400)
    const json = await response.json()
    expect(json.success).toBe(false)
    expect(json.error).toMatch(/nom/)
    expect(prismaMock.project.create).not.toHaveBeenCalled()
  })

  it('POST refuse une URL de téléchargement invalide', async () => {
    const response = await POST(
      adminRequest('/api/projects', {
        method: 'POST',
        body: { ...validProjectBody, windowsUrl: 'ftp://example.com/app.exe' },
      }),
    )
    expect(response.status).toBe(400)
    const json = await response.json()
    expect(json.success).toBe(false)
    expect(json.error).toMatch(/http/)
  })

  it('POST crée un logiciel et force webAudience à null', async () => {
    prismaMock.project.create.mockResolvedValue({ id: 42, ...validProjectBody, webAudience: null })
    const response = await POST(adminRequest('/api/projects', { method: 'POST', body: validProjectBody }))
    const json = await response.json()

    expect(response.status).toBe(201)
    expect(json.success).toBe(true)
    expect(json.message).toBe('Project créé avec succès')
    expect(prismaMock.project.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: 'Space Taker Test',
        projectType: 'logiciel',
        webAudience: null,
        windowsUrl: 'https://example.com/space-taker.exe',
        displayOrder: 2,
      }),
    })
  })
})
