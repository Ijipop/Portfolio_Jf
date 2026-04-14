/**
 * Assets pour l’écran de chargement Projets.
 *
 * **WebM** (VP9 + alpha) + **MP4** (H.264, repli Safari / iOS) : générés avec
 * `npm run encode:loading-webm` (voir `scripts/encode-projects-loading-webm.mjs`).
 *
 * **Repli** : séquence PNG + `frames.json` si la vidéo ne charge pas.
 */
export const PROJECTS_LOADING_VIDEO = {
  gears: {
    webm: '/img/projects-loading/gears.webm',
    mp4: '/img/projects-loading/gears.mp4',
  },
  loadingText: {
    webm: '/img/projects-loading/loading-text.webm',
    mp4: '/img/projects-loading/loading-text.mp4',
  },
} as const

export const PROJECTS_LOADING_FRAMES = {
  gears: {
    manifestHref: '/img/projects-loading/gears/frames.json',
    baseHref: '/img/projects-loading/gears',
  },
  loadingText: {
    manifestHref: '/img/projects-loading/loading-text/frames.json',
    baseHref: '/img/projects-loading/loading-text',
  },
} as const
