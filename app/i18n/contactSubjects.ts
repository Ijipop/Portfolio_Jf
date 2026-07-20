import type { Locale } from './translations'

/** Sujets du formulaire contact (query `?subject=`) — texte affiché tel quel, pas des clés i18n. */
export const CONTACT_SUBJECT_IMPROVE_SITE: Record<Locale, string> = {
  fr: 'Projet : refonte ou amélioration de site',
  en: 'Project: website redesign or improvement',
}

export const CONTACT_SUBJECT_TECH_SUPPORT: Record<Locale, string> = {
  fr: 'Demande : soutien informatique (Montréal / à distance)',
  en: 'Request: technical support (Montreal / remote)',
}

export const CONTACT_SUBJECT_SOFTWARE: Record<Locale, string> = {
  fr: 'Offre : petit outil ou automatisation',
  en: 'Offer: small tool or automation',
}
