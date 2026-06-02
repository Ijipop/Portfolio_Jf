import type { Locale } from './translations'

/** Bandeau « Pas besoin de tout refaire » — textes affichés (évite les clés i18n brutes si dict en retard). */
export const REASSURANCE_BANNER_COPY: Record<
  Locale,
  { title: string; lead: string; cta: string }
> = {
  fr: {
    title: 'Pas besoin de tout refaire',
    lead:
      'Pas besoin de tout refaire : j’améliore aussi votre site actuel, je corrige les irritants et je priorise ce qui rapporte le plus.',
    cta: 'Améliorer votre site →',
  },
  en: {
    title: 'No need to start from scratch',
    lead:
      'No need to redo everything: I can improve your current site, fix pain points and prioritize what brings the most value.',
    cta: 'Improve your site →',
  },
}
