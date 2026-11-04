import PublicChromeShell from '@/components/public-v2/chrome/PublicChromeShell'
import { AboutSection } from '@/components/public-v2/sections/About'
import { ContactSection } from '@/components/public-v2/sections/Contact'
import { Hero } from '@/components/public-v2/sections/Hero'
import { LaboratorySection } from '@/components/public-v2/sections/Laboratory'
import { ServicesSection } from '@/components/public-v2/sections/Services'
import { WorkSection } from '@/components/public-v2/sections/Work'
import { PUBLIC_V2_MAIN_ID } from '@/lib/public-v2/nav'

export type PopAtelierHomeShellProps = {
  /** Pathname courant pour résoudre les hrefs Header/Footer. */
  pathname: string
}

/**
 * Accueil Pop Atelier — chrome public + six sections validées.
 * Pas d’outils de fondations (sandbox uniquement, hors de ce shell).
 */
export default function PopAtelierHomeShell({ pathname }: PopAtelierHomeShellProps) {
  return (
    <PublicChromeShell pathname={pathname} mainId={PUBLIC_V2_MAIN_ID} mainTestId="pv2-home-main">
      <Hero />
      <ServicesSection />
      <WorkSection />
      <LaboratorySection />
      <AboutSection />
      <ContactSection />
    </PublicChromeShell>
  )
}
