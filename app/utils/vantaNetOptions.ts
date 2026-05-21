import type { ThemeName } from '@/design-system/themes'
import { THEMES } from '@/design-system/themes'
import type { VantaQuality } from '@/utils/deviceHints'

function hexToNumber(hex: string): number {
  return parseInt(hex.slice(1), 16)
}

const QUALITY_TUNING: Record<
  VantaQuality,
  { points: number; maxDistance: number; spacing: number; mouseControls: boolean }
> = {
  normal: { points: 12, maxDistance: 22, spacing: 18, mouseControls: true },
  degraded: { points: 9, maxDistance: 20, spacing: 20, mouseControls: true },
  soft: { points: 7, maxDistance: 18, spacing: 22, mouseControls: true },
}

export function getVantaNetOptions(
  themeName: ThemeName,
  quality: VantaQuality,
  overrides?: { colorHex?: string; backgroundHex?: string }
): Record<string, unknown> {
  const theme = THEMES[themeName]
  const tuning = QUALITY_TUNING[quality]

  return {
    color: overrides?.colorHex ? hexToNumber(overrides.colorHex) : hexToNumber(theme.primary),
    backgroundColor: overrides?.backgroundHex
      ? hexToNumber(overrides.backgroundHex)
      : hexToNumber(theme.bg),
    points: tuning.points,
    maxDistance: tuning.maxDistance,
    spacing: tuning.spacing,
    showDots: true,
    mouseControls: tuning.mouseControls,
    touchControls: tuning.mouseControls,
  }
}
