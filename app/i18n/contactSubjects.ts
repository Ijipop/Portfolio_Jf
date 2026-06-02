import type { Locale } from './translations'

/** Sujets du formulaire contact (query `?subject=`) — texte affiché tel quel, pas des clés i18n. */
export const CONTACT_SUBJECT_IMPROVE_SITE: Record<Locale, string> = {
  fr: 'Projet : refonte ou amélioration de site',
  en: 'Project: website redesign or improvement',
}
