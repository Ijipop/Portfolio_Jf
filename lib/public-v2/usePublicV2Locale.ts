'use client'

import { useLanguageOptional } from '@/contexts/LanguageContext'
import type { PublicV2Locale } from './locale'

/**
 * Locale effective sous le chrome Pop Atelier.
 * Hors LanguageProvider (tests unitaires de section) → FR.
 * Flag off → chrome `fixedLocale="fr"` → toujours FR même si localStorage=en.
 */
export function usePublicV2Locale(): PublicV2Locale {
  const ctx = useLanguageOptional()
  if (!ctx) return 'fr'
  return ctx.locale === 'en' ? 'en' : 'fr'
}
