import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeNextRequest } from '../../../../lib/__tests__/helpers/http'
import { POST } from '../route'

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
}))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

const validBody = {
  name: 'Jean Test',
  email: 'jean.test@example.com',
  subject: 'Demande de site',
  message: 'Bonjour, je voudrais un site vitrine.',
  phone: '514-555-0100',
  bm_verify: '',
}

let ipCounter = 0
function uniqueIp(): string {
  ipCounter += 1
  return `198.51.100.${ipCounter}`
}

async function postContact(body: unknown, ip = uniqueIp(), rawBody?: string) {
  const request = makeNextRequest('/api/contact', {
    method: 'POST',
    body: rawBody === undefined ? body : undefined,
    rawBody,
    headers: { 'x-forwarded-for': ip },
  })
  return POST(request)
}

describe('POST /api/contact', { timeout: 15_000 }, () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 're_test_id' }, error: null })
    vi.stubEnv('RESEND_API_KEY', 're_test_fake_key')
    vi.stubEnv('CONTACT_EMAIL', 'inbox.test@example.com')
    vi.stubEnv('RESEND_FROM', 'Ijipop Test <test@example.com>')
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('envoie un message valide via Resend mocké', async () => {
    const response = await postContact(validBody)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json).toEqual({
      success: true,
      message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
    })
    expect(sendMock).toHaveBeenCalledOnce()
    const payload = sendMock.mock.calls[0]?.[0] as {
      to: string
      from: string
      replyTo: string
      subject: string
      html: string
    }
    expect(payload.to).toBe('inbox.test@example.com')
    expect(payload.from).toBe('Ijipop Test <test@example.com>')
    expect(payload.replyTo).toBe(validBody.email)
    expect(payload.subject).toBe('[Ijipop] Demande de site')
    expect(payload.html).toContain('Jean Test')
  })

  it('inclut le brief projet web dans le HTML', async () => {
    await postContact({
      ...validBody,
      projectWeb: {
        siteType: 'vitrine',
        mainGoal: 'Présenter mes services',
        budget: 'discuss',
      },
    })
    const html = (sendMock.mock.calls[0]?.[0] as { html: string }).html
    expect(html).toContain('Demande de projet web')
    expect(html).toContain('Site vitrine')
    expect(html).toContain('À discuter')
  })

  it('inclut le brief soutien technique dans le HTML', async () => {
    await postContact({
      ...validBody,
      subject: 'Soutien',
      technicalSupport: {
        needType: 'troubleshooting',
        urgency: 'thisWeek',
        supportMode: 'remote',
      },
    })
    const html = (sendMock.mock.calls[0]?.[0] as { html: string }).html
    expect(html).toContain('Demande de soutien technique')
    expect(html).toContain('Dépannage Windows')
  })

  it('rejette un JSON invalide', async () => {
    const response = await postContact(undefined, uniqueIp(), '{not-json')
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Requête JSON invalide',
    })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('exige les champs obligatoires', async () => {
    const response = await postContact({ ...validBody, name: '', subject: '' })
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Tous les champs sont requis',
    })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejette un email invalide', async () => {
    const response = await postContact({ ...validBody, email: 'pas-un-email' })
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Format d'email invalide",
    })
  })

  it('rejette un téléphone invalide', async () => {
    const response = await postContact({ ...validBody, phone: 'abc' })
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Numéro de téléphone invalide',
    })
  })

  it('simule un succès honeypot sans appeler Resend', async () => {
    const response = await postContact({ ...validBody, bm_verify: 'http://spam.test' })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({ success: true })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('limite le débit après 8 tentatives sur la même IP', async () => {
    const ip = uniqueIp()
    for (let i = 0; i < 8; i += 1) {
      const response = await postContact({ ...validBody, name: '' }, ip)
      expect(response.status).toBe(400)
    }
    const limited = await postContact(validBody, ip)
    expect(limited.status).toBe(429)
    const json = await limited.json()
    expect(json.success).toBe(false)
    expect(json.error).toMatch(/Trop de messages/)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('le honeypot ne consomme pas le quota de débit', async () => {
    const ip = uniqueIp()
    for (let i = 0; i < 9; i += 1) {
      const response = await postContact({ ...validBody, bm_verify: 'bot' }, ip)
      expect(response.status).toBe(200)
    }
    const real = await postContact(validBody, ip)
    expect(real.status).toBe(200)
    expect(sendMock).toHaveBeenCalledOnce()
  })

  it('retourne 500 si RESEND_API_KEY est absent', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const response = await postContact(validBody)
    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Configuration email manquante (RESEND_API_KEY)',
    })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('propage une erreur fournisseur Resend', async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { message: 'The ijipop.com domain is not verified' },
    })
    const response = await postContact(validBody)
    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'The ijipop.com domain is not verified',
    })
  })
})
