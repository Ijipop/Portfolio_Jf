/**
 * Assets pour l’écran de chargement Projets (animations par frames).
 *
 * Pour chaque dossier : copier les images puis remplir `frames.json` avec les noms de
 * fichiers **dans l’ord** (ex. `["0001.png","0002.png"]`).
 */
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
