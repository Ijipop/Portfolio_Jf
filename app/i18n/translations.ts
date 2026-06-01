/**
 * Point d’entrée i18n : locale FR synchrone (SSR / défaut), EN chargée à la demande.
 */
import { fr } from './locales/fr'

export type Locale = 'fr' | 'en'

/** Structure imbriquée clé → chaîne (FR et EN partagent les mêmes chemins). */
export type TranslationDict = Record<string, unknown>

/** Dictionnaire FR — inclus dans le bundle initial. */
export { fr }

export async function loadTranslationDict(locale: Locale): Promise<TranslationDict> {
  if (locale === 'fr') return fr as TranslationDict
  const { en } = await import('./locales/en')
  return en as TranslationDict
}
