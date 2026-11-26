'use client'

import { getContactPageContent } from '@/lib/public-v2/contactPageContent'
import { getProjectsCopy } from '@/lib/public-v2/projectsContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'

type BusyKind = 'contactForm' | 'contactMerci' | 'projects'

/** Fallback Suspense localisé (hérite du chrome LanguageProvider). */
export default function LocalizedBusy({ kind }: { kind: BusyKind }) {
  const locale = usePublicV2Locale()
  const text =
    kind === 'projects'
      ? getProjectsCopy(locale).loading
      : kind === 'contactMerci'
        ? getContactPageContent(locale).loadingMerci
        : getContactPageContent(locale).loadingForm

  return (
    <p aria-busy="true" data-testid={`pv2-busy-${kind}`}>
      {text}
    </p>
  )
}
