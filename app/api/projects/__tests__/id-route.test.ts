import jwt from 'jsonwebtoken'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeNextRequest } from '../../../../lib/__tests__/helpers/http'
import { DELETE, GET, PUT } from '../[id]/route'

const TEST_SECRET = 'ijipop-v2-test-jwt-secret-not-production'

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    project: {
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

const existing = {
  id: 7,
  name: 'DeskDot',
  description: 'Launcher',
  technologies: 'C#',
  status: 'publié',
}

const validBody = {
  name: 'DeskDot',
  description: 'Launcher de bureau',
  technologies: 'C#',
  status: 'publié',
  url: '/deskdot',
  siteUrl: '',
  downloadUrl: '',
  windowsUrl: 'https://example.com/deskdot.exe',
  macosUrl: '',
  imageUrl: '',
  projectType: 'logiciel',
  displayOrder: 1,
}

function adminRequest(path: string, init: Parameters<typeof makeNextRequest>[1] = {}) {
  const token = jwt.sign({ userId: 1, role: 'admin' }, TEST_SECRET, { expiresIn: '1h' })
  return makeNextRequest(path, {
    ...init,
    cookies: { ...init.cookies, adminToken: token },
  })
}

const params = (id: string) => ({ params: Promise.resolve({ id }) })

describe('/api/projects/[id]', { timeout: 15_000 }, () => {
  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', TEST_SECRET)
    prismaMock.project.findUnique.mockReset()
    prismaMock.project.update.mockReset()
    prismaMock.project.delete.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('GET refuse un ID invalide', async () => {
    const response = await GET(makeNextRequest('/api/projects/abc'), params('abc'))
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'ID du project invalide',
    })
  })

  it('GET retourne 404 si le projet est absent', async () => {
    prismaMock.project.findUnique.mockResolvedValue(null)
    const response = await GET(makeNextRequest('/api/projects/7'), params('7'))
    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Project non trouvé',
    })
  })

  it('GET retourne le contrat succès', async () => {
    prismaMock.project.findUnique.mockResolvedValue(existing)
    const response = await GET(makeNextRequest('/api/projects/7'), params('7'))
    const json = await response.json()
    expect(response.status).toBe(200)
    expect(json).toEqual({
      success: true,
      data: existing,
      message: 'Project trouvé',
    })
  })

  it('DELETE refuse sans authentification', async () => {
    const response = await DELETE(makeNextRequest('/api/projects/7', { method: 'DELETE' }), params('7'))
    expect(response.status).toBe(401)
    expect(prismaMock.project.delete).not.toHaveBeenCalled()
  })

  it('DELETE refuse un jeton invalide', async () => {
    const response = await DELETE(
      makeNextRequest('/api/projects/7', {
        method: 'DELETE',
        cookies: { adminToken: 'invalid' },
      }),
      params('7'),
    )
    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Token invalide ou expiré',
    })
  })

  it('DELETE retourne 404 si le projet n’existe pas', async () => {
    prismaMock.project.findUnique.mockResolvedValue(null)
    const response = await DELETE(adminRequest('/api/projects/7', { method: 'DELETE' }), params('7'))
    expect(response.status).toBe(404)
    expect(prismaMock.project.delete).not.toHaveBeenCalled()
  })

  it('DELETE supprime un projet existant', async () => {
    prismaMock.project.findUnique.mockResolvedValue(existing)
    prismaMock.project.delete.mockResolvedValue(existing)
    const response = await DELETE(adminRequest('/api/projects/7', { method: 'DELETE' }), params('7'))
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: 'Project supprimé avec succès',
    })
    expect(prismaMock.project.delete).toHaveBeenCalledWith({ where: { id: 7 } })
  })

  it('PUT refuse une description vide', async () => {
    const response = await PUT(
      adminRequest('/api/projects/7', { method: 'PUT', body: { ...validBody, description: '' } }),
      params('7'),
    )
    expect(response.status).toBe(400)
    expect(prismaMock.project.update).not.toHaveBeenCalled()
  })

  it('PUT met à jour un projet existant', async () => {
    prismaMock.project.findUnique.mockResolvedValue(existing)
    prismaMock.project.update.mockResolvedValue({ ...existing, description: validBody.description })
    const response = await PUT(
      adminRequest('/api/projects/7', { method: 'PUT', body: validBody }),
      params('7'),
    )
    const json = await response.json()
    expect(response.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.message).toBe('Project modifié avec succès')
    expect(prismaMock.project.update).toHaveBeenCalledWith({
      where: { id: 7 },
      data: expect.objectContaining({
        name: 'DeskDot',
        projectType: 'logiciel',
        webAudience: null,
      }),
    })
  })
})
