import { describe, expect, it } from 'vitest'
import {
  SPACE_TAKER_MACOS_URL,
  SPACE_TAKER_RELEASES_URL,
  SPACE_TAKER_WINDOWS_URL,
  toSpaceTakerPublicDownloadUrl,
} from '../productDownloads'

describe('toSpaceTakerPublicDownloadUrl', () => {
  it('rewrites private Space-Taker GitHub URLs to public binaries', () => {
    expect(
      toSpaceTakerPublicDownloadUrl(
        'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe',
        'windows',
      ),
    ).toBe(SPACE_TAKER_WINDOWS_URL)
    expect(
      toSpaceTakerPublicDownloadUrl(
        'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.0/SpaceTaker_0.2.0_aarch64.dmg',
        'macos',
      ),
    ).toBe(SPACE_TAKER_MACOS_URL)
    expect(toSpaceTakerPublicDownloadUrl('https://github.com/Ijipop/Space-Taker/releases', 'github')).toBe(
      SPACE_TAKER_RELEASES_URL,
    )
  })

  it('falls back to the public assets when empty', () => {
    expect(toSpaceTakerPublicDownloadUrl('', 'windows')).toBe(SPACE_TAKER_WINDOWS_URL)
    expect(toSpaceTakerPublicDownloadUrl(null, 'macos')).toBe(SPACE_TAKER_MACOS_URL)
  })

  it('keeps a public Space-Taker-releases asset URL', () => {
    expect(toSpaceTakerPublicDownloadUrl(SPACE_TAKER_WINDOWS_URL, 'windows')).toBe(SPACE_TAKER_WINDOWS_URL)
    expect(toSpaceTakerPublicDownloadUrl(SPACE_TAKER_MACOS_URL, 'macos')).toBe(SPACE_TAKER_MACOS_URL)
  })
})
