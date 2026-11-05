import { PublicChromeShell } from '@/components/public-v2/chrome'
import { AboutPageClient } from '@/components/public-v2/about'

/**
 * À propos V2 — page éditoriale Pop Atelier.
 * Contenu statique (aboutPageContent) — aucun Prisma / API.
 */
export default function AboutPage() {
  return (
    <PublicChromeShell pathname="/portfolio/a-propos" mainId="pv2-about-main" mainTestId="pv2-about-main">
      <AboutPageClient />
    </PublicChromeShell>
  )
}
