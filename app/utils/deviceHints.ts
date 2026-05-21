/** Qualité Vanta : même effet réseau, densité / réactivité adaptées. */
export type VantaQuality = 'normal' | 'degraded' | 'soft'

export function resolveInitialVantaQuality(input: {
  deviceMemory?: number
  hardwareConcurrency?: number
}): VantaQuality {
  const mem = input.deviceMemory
  const cores = input.hardwareConcurrency

  if (typeof mem === 'number' && Number.isFinite(mem) && mem > 0 && mem <= 4) {
    return 'soft'
  }
  if (typeof cores === 'number' && Number.isFinite(cores) && cores > 0 && cores <= 2) {
    return 'soft'
  }
  if (typeof mem === 'number' && Number.isFinite(mem) && mem > 0 && mem <= 8) {
    return 'degraded'
  }
  if (typeof cores === 'number' && Number.isFinite(cores) && cores > 0 && cores <= 4) {
    return 'degraded'
  }

  return 'normal'
}

export function downgradeVantaQuality(current: VantaQuality): VantaQuality {
  if (current === 'normal') return 'degraded'
  return 'soft'
}

export function vantaTargetFps(quality: VantaQuality): number {
  switch (quality) {
    case 'soft':
      return 24
    case 'degraded':
      return 30
    default:
      return 60
  }
}
