'use client'

export const VANTA_SCRIPT_TIMEOUT_MS = 12_000

export const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
export const P5_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js'

export const VANTA_NET_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js'
export const VANTA_TOPOLOGY_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js'
/** Lab uniquement — ne pas ajouter à VANTA_PRELOAD_SOURCES */
export const VANTA_BIRDS_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js'

/** Scripts préchargés pour Vanta NET (Three.js + vanta.net uniquement). */
export const VANTA_PRELOAD_SOURCES = [
  THREE_CDN,
  VANTA_NET_CDN,
] as const
