/**
 * Fallback des landings produit si windowsUrl / macosUrl admin sont vides.
 * Source de vérité live : champs projet en admin (DB).
 */
export const SPACE_TAKER_LANDING_HREF = '/spacetaker'
export const SPACE_TAKER_RELEASES_URL = 'https://github.com/Ijipop/Space-Taker-releases/releases'
export const SPACE_TAKER_WINDOWS_URL =
  'https://github.com/Ijipop/Space-Taker-releases/releases/download/v0.3.7/SpaceTaker_0.3.7_x64-setup.exe'
export const SPACE_TAKER_MACOS_URL =
  'https://github.com/Ijipop/Space-Taker-releases/releases/download/v0.3.7/SpaceTaker_0.3.7_universal.dmg'

function isPrivateSpaceTakerGithubUrl(url: string): boolean {
  const lower = url.toLowerCase()
  return lower.includes('github.com/ijipop/space-taker') && !lower.includes('space-taker-releases')
}

/** Anciens liens du repo privé Space-Taker → assets publics Space-Taker-releases. */
export function toSpaceTakerPublicDownloadUrl(
  url: string | null | undefined,
  platform: 'windows' | 'macos' | 'github' = 'windows',
): string {
  const fallback =
    platform === 'macos'
      ? SPACE_TAKER_MACOS_URL
      : platform === 'github'
        ? SPACE_TAKER_RELEASES_URL
        : SPACE_TAKER_WINDOWS_URL
  const value = url?.trim()
  if (!value) return fallback
  const lower = value.toLowerCase()
  if (!isPrivateSpaceTakerGithubUrl(lower)) return value
  if (platform === 'macos' || lower.includes('.dmg') || lower.includes('aarch64') || lower.includes('universal')) {
    return SPACE_TAKER_MACOS_URL
  }
  if (platform === 'github' || /\/space-taker\/?$/.test(lower) || lower.endsWith('/releases')) {
    return SPACE_TAKER_RELEASES_URL
  }
  return SPACE_TAKER_WINDOWS_URL
}

export const PRODUCT_DOWNLOADS = {
  cpuZe: {
    windows:
      'https://github.com/Ijipop/CPU-ZE/releases/download/v0.3.13/CPU-ZE_0.3.13_x64-setup.exe',
    github: 'https://github.com/Ijipop/CPU-ZE',
  },
  spaceTaker: {
    windows: SPACE_TAKER_WINDOWS_URL,
    macos: SPACE_TAKER_MACOS_URL,
    github: SPACE_TAKER_RELEASES_URL,
  },
  /** Fallback vide : source de vérité = windowsUrl admin. */
  deskDot: {
    windows: '',
    github: '',
  },
  traducteur: {
    windows: 'https://github.com/Ijipop/Traducteurio/releases/latest',
    github: 'https://github.com/Ijipop/Traducteurio',
  },
} as const

export type ProductDownloadLinks = {
  windows: string
  macos?: string
  github: string
}
