import { describe, expect, it } from 'vitest'
import {
  mimeFromImageExtension,
  normalizeUploadedImageFile,
} from '../normalize-uploaded-image-file'

function fakeFile(name: string, type: string, bytes = new Uint8Array([1, 2, 3])): File {
  return new File([bytes], name, { type, lastModified: 1_700_000_000_000 })
}

describe('mimeFromImageExtension', () => {
  it('mappe les extensions courantes', () => {
    expect(mimeFromImageExtension('x.PNG')).toBe('image/png')
    expect(mimeFromImageExtension('x.jpeg')).toBe('image/jpeg')
    expect(mimeFromImageExtension('x.webp')).toBe('image/webp')
  })

  it('refuse les extensions inconnues', () => {
    expect(mimeFromImageExtension('x.bmp')).toBeNull()
    expect(mimeFromImageExtension('x')).toBeNull()
  })
})

describe('normalizeUploadedImageFile', () => {
  it('conserve un PNG avec MIME image/png', () => {
    const original = fakeFile('a.png', 'image/png')
    const result = normalizeUploadedImageFile(original)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.file).toBe(original)
      expect(result.file.type).toBe('image/png')
    }
  })

  it('normalise un PNG Windows avec MIME vide', () => {
    const original = fakeFile('photo.PNG', '')
    const result = normalizeUploadedImageFile(original)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.file).not.toBe(original)
      expect(result.file.name).toBe('photo.PNG')
      expect(result.file.type).toBe('image/png')
      expect(result.file.size).toBe(original.size)
    }
  })

  it('refuse un MIME non autorisé même avec extension .png', () => {
    const result = normalizeUploadedImageFile(fakeFile('fake.png', 'image/bmp'))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/non autorisé/i)
    }
  })

  it('refuse MIME vide sans extension autorisée', () => {
    const result = normalizeUploadedImageFile(fakeFile('notes.txt', ''))
    expect(result.ok).toBe(false)
  })
})
