import { Suspense } from 'react'
import { PublicChromeShell } from '@/components/public-v2/chrome'
import { ContactPageClient } from '@/components/public-v2/contact'

/**
 * Contact V2 — questionnaire Pop Atelier.
 * Soumission réelle via submitContactRequest → POST /api/contact (aucune fixture).
 */
export default function ContactPage() {
  return (
    <PublicChromeShell pathname="/portfolio/contact" mainId="pv2-contact-main" mainTestId="pv2-contact-main">
      <Suspense fallback={<p aria-busy="true">Chargement du formulaire…</p>}>
        <ContactPageClient />
      </Suspense>
    </PublicChromeShell>
  )
}
