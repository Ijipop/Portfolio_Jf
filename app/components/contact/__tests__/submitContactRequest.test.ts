import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitContactRequest } from '../submitContactRequest'

describe('submitContactRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('retourne ok quand l’API confirme le succès', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ success: true, message: 'Message envoyé avec succès !' }),
      }),
    )

    await expect(
      submitContactRequest({ name: 'Jean', email: 'a@b.c', subject: 'Sujet', message: 'Bonjour à tous' }),
    ).resolves.toEqual({ ok: true })
  })

  it('propage le message d’erreur API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ success: false, error: 'Format d\'email invalide' }),
      }),
    )

    await expect(submitContactRequest({ email: 'bad' })).resolves.toEqual({
      ok: false,
      error: 'Format d\'email invalide',
      kind: 'api',
    })
  })

  it('utilise le message de repli en cas d’échec réseau', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await expect(submitContactRequest({}, 'Erreur réseau contact')).resolves.toEqual({
      ok: false,
      error: 'Erreur réseau contact',
      kind: 'network',
    })
    expect(consoleSpy).toHaveBeenCalled()
  })
})
