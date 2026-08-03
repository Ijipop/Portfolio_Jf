/**
 * Fallback des landings produit si windowsUrl / macosUrl admin sont vides.
 * Source de vérité live : champs projet en admin (DB).
 */
export const PRODUCT_DOWNLOADS = {
  cpuZe: {
    windows:
      'https://github.com/Ijipop/CPU-ZE/releases/download/v0.3.13/CPU-ZE_0.3.13_x64-setup.exe',
    github: 'https://github.com/Ijipop/CPU-ZE',
  },
  spaceTaker: {
    windows:
      'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe',
    macos:
      'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.0/SpaceTaker_0.2.0_aarch64.dmg',
    github: 'https://github.com/Ijipop/Space-Taker',
  },
} as const

export type ProductDownloadLinks = {
  windows: string
  macos?: string
  github: string
}
