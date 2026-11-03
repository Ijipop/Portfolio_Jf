import type { ReactNode } from 'react'
import ContactFab from '@/components/shared/ContactFab'
import ThemeWrapper from '@/components/ThemeWrapper'
import FullPageTopologyWrapper from '@/components/FullPageTopologyWrapper'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import { getCachedBeigePresentationBgUrl } from '@/lib/cached-site-appearance'

/**
 * Chrome vitrine : thèmes, topology, FAB — n’enveloppe pas /admin.
 * Le groupe (public) ne change pas les URLs.
 */
export default async function PublicLayout({ children }: { children: ReactNode }) {
  const initialBeigePresentationBgUrl = await getCachedBeigePresentationBgUrl()

  return (
    <ThemeWrapper initialBeigePresentationBgUrl={initialBeigePresentationBgUrl}>
      <WebVitalsReporter />
      <FullPageTopologyWrapper>{children}</FullPageTopologyWrapper>
      <ContactFab />
    </ThemeWrapper>
  )
}
