import { describe, expect, it } from 'vitest'
import {
  normalizeProjectImageUrlInput,
  parseBeigePresentationBgUrl,
  validateStoredImageReference,
} from '../stored-image-value'

describe('validateStoredImageReference', () => {
  it('accepts https and paths', () => {
    expect(validateStoredImageReference('https://a/b.png').ok).toBe(true)
    expect(validateStoredImageReference('/img/x.webp').ok).toBe(true)
  })

  it('rejects javascript', () => {
    expect(validateStoredImageReference('javascript:alert(1)').ok).toBe(false)
  })

  it('accepts small data image prefix', () => {
    const small = 'data:image/png;base64,' + 'a'.repeat(80)
    expect(validateStoredImageReference(small).ok).toBe(true)
  })
})

describe('parseBeigePresentationBgUrl', () => {
  it('null and empty to null', () => {
    expect(parseBeigePresentationBgUrl(null)).toEqual({ ok: true, value: null })
    expect(parseBeigePresentationBgUrl('  ')).toEqual({ ok: true, value: null })
  })
})

describe('normalizeProjectImageUrlInput', () => {
  it('empty to empty string', () => {
    expect(normalizeProjectImageUrlInput('')).toEqual({ ok: true, value: '' })
  })
})
