'use client'

import { getContactPageContent } from '@/lib/public-v2/contactPageContent'
import { getProjectsCopy } from '@/lib/public-v2/projectsContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import IjipopWorkLoader from './IjipopWorkLoader'

type BusyKind = 'contactForm' | 'contactMerci' | 'projects'

/** Fallback Suspense localisé (hérite du chrome LanguageProvider). */
export default function LocalizedBusy({ kind }: { kind: BusyKind }) {
  const locale = usePublicV2Locale()

  if (kind === 'projects') {
    return (
      <IjipopWorkLoader
        label={getProjectsCopy(locale).loading}
        testId="pv2-busy-projects"
      />
    )
  }

  const text =
    kind === 'contactMerci'
      ? getContactPageContent(locale).loadingMerci
      : getContactPageContent(locale).loadingForm

  return (
    <p aria-busy="true" data-testid={`pv2-busy-${kind}`}>
      {text}
    </p>
  )
}
