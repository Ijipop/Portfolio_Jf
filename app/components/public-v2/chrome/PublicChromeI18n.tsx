'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { isPublicI18nToggleEnabled } from '@/lib/public-v2/i18nFlag'

/**
 * Provider i18n du chrome Pop Atelier.
 * Tant que le flag d’activation est off, la locale est verrouillée en FR
 * pour éviter Header EN + pages FR (localStorage V1).
 */
export default function PublicChromeI18n({ children }: { children: ReactNode }) {
  const toggleEnabled = isPublicI18nToggleEnabled()
  return (
    <LanguageProvider fixedLocale={toggleEnabled ? undefined : 'fr'}>
      {children}
    </LanguageProvider>
  )
}
