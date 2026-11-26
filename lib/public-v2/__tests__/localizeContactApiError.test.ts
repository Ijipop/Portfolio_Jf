import { describe, expect, it } from 'vitest'
import { localizeContactApiError } from '../localizeContactApiError'

const copy = {
  sendError: 'Could not send',
  networkError: 'Connection error',
  rateLimitError: 'Too many messages',
}

describe('localizeContactApiError', () => {
  it('localise le réseau', () => {
    expect(
      localizeContactApiError({ error: 'x', kind: 'network' }, copy, 'en'),
    ).toBe('Connection error')
  })

  it('localise le rate limit via status 429', () => {
    expect(
      localizeContactApiError({ error: 'Requête…', kind: 'api', status: 429 }, copy, 'en'),
    ).toBe('Too many messages')
  })

  it('localise le rate limit via texte FR connu', () => {
    expect(
      localizeContactApiError(
        {
          error: 'Trop de messages envoyés depuis cette adresse. Réessayez plus tard.',
          kind: 'api',
        },
        copy,
        'en',
      ),
    ).toBe('Too many messages')
  })

  it('EN : remplace les erreurs API FR brutes par le message générique', () => {
    expect(
      localizeContactApiError(
        { error: "Format d'email invalide", kind: 'api', status: 400 },
        copy,
        'en',
      ),
    ).toBe('Could not send')
  })

  it('FR : conserve le diagnostic serveur', () => {
    expect(
      localizeContactApiError(
        { error: 'Erreur simulée P0', kind: 'api', status: 500 },
        copy,
        'fr',
      ),
    ).toBe('Erreur simulée P0')
  })
})
