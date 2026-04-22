import { describe, expect, it } from 'vitest'
import { getImageUrl } from '../getImageUrl'

describe('getImageUrl', () => {
  it('returns data:image as-is', () => {
    const u = 'data:image/png;base64,AAA'
    expect(getImageUrl(u)).toBe(u)
  })

  it('normalizes relative paths', () => {
    expect(getImageUrl('imgs/x.png')).toBe('/imgs/x.png')
    expect(getImageUrl('/a/b')).toBe('/a/b')
  })

  it('passes through https', () => {
    expect(getImageUrl('https://ex.test/a.png')).toBe('https://ex.test/a.png')
  })
})
