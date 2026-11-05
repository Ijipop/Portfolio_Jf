import { Suspense } from 'react'
import { PublicChromeShell } from '@/components/public-v2/chrome'
import { ContactPageClient } from '@/components/public-v2/contact'

/**
 * Confirmation contact — noindex ; analytics uniquement sur ce parcours réel.
 */
export default function ContactMerciPage() {
  return (
    <PublicChromeShell
      pathname="/portfolio/contact"
      mainId="pv2-contact-merci-main"
      mainTestId="pv2-contact-merci-main"
    >
      <Suspense fallback={<p aria-busy="true">Confirmation…</p>}>
        <ContactPageClient showMerciDialog />
      </Suspense>
    </PublicChromeShell>
  )
}
