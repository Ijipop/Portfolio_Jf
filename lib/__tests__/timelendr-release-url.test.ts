import { describe, expect, it } from 'vitest'
import { isValidTimelendrReleaseUrl } from '../timelendr-release-url'

describe('isValidTimelendrReleaseUrl', () => {
  it('accepts common release URLs with allowed extensions', () => {
    expect(isValidTimelendrReleaseUrl('https://exemple.com/fichier.zip')).toBe(true)
    expect(isValidTimelendrReleaseUrl('https://exemple.com/app.exe?dl=1')).toBe(true)
    expect(isValidTimelendrReleaseUrl('https://exemple.com/Timelendr.dmg')).toBe(true)
    expect(
      isValidTimelendrReleaseUrl(
        'https://github.com/org/repo/releases/download/v1.0/Timelendr-win.zip',
      ),
    ).toBe(true)
  })

  it('rejects URLs without a downloadable extension in the path or query', () => {
    expect(isValidTimelendrReleaseUrl('https://drive.google.com/file/d/abc/view')).toBe(false)
    expect(isValidTimelendrReleaseUrl('https://exemple.com/download')).toBe(false)
    expect(isValidTimelendrReleaseUrl('ftp://exemple.com/app.zip')).toBe(false)
    expect(isValidTimelendrReleaseUrl('')).toBe(false)
  })
})
