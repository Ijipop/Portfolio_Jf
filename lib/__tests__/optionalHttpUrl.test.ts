import { describe, expect, it } from 'vitest'
import { parseOptionalHttpUrl } from '../optionalHttpUrl'

describe('parseOptionalHttpUrl', () => {
  it('accepte vide, null-like et http(s)', () => {
    expect(parseOptionalHttpUrl('', 'du site')).toEqual({ ok: true, value: null })
    expect(parseOptionalHttpUrl('   ', 'du site')).toEqual({ ok: true, value: null })
    expect(parseOptionalHttpUrl(undefined, 'du site')).toEqual({ ok: true, value: null })
    expect(parseOptionalHttpUrl('https://ijipop.com/spacetaker', 'du site')).toEqual({
      ok: true,
      value: 'https://ijipop.com/spacetaker',
    })
    expect(parseOptionalHttpUrl('http://localhost:3000/cpu-ze', 'du site').ok).toBe(true)
  })

  it('rejette une URL sans schéma http(s)', () => {
    const result = parseOptionalHttpUrl('ftp://example.com/file', 'de téléchargement')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toContain('de téléchargement')
    }
    expect(parseOptionalHttpUrl('javascript:alert(1)', 'Windows').ok).toBe(false)
    expect(parseOptionalHttpUrl('/relatif', 'macOS').ok).toBe(false)
  })
})
