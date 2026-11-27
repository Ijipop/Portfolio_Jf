'use client'

import { Container } from '@/components/public-v2/primitives'
import { getSoftwareEditorialContent } from '@/lib/public-v2/softwareEditorialContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import SoftwareHeroBuild from './SoftwareHeroBuild'
import SoftwareOffers from './SoftwareOffers'
import SoftwareProcess from './SoftwareProcess'
import SoftwareProjects from './SoftwareProjects'
import SoftwareFinalCta from './SoftwareFinalCta'
import styles from './SoftwarePage.module.css'

export default function SoftwarePageClient() {
  const locale = usePublicV2Locale()
  const copy = getSoftwareEditorialContent(locale)

  return (
    <div className={styles.page} data-testid="pv2-software-page">
      <Container variant="wide">
        <SoftwareHeroBuild
          eyebrow={copy.hero.eyebrow}
          title={copy.hero.title}
          lead={copy.hero.lead}
          ctaProjects={copy.hero.ctaProjects}
          ctaContact={copy.hero.ctaContact}
          projectsHref={copy.hero.projectsHref}
          contactHref={copy.hero.contactHref}
          ariaLabel={copy.hero.buildAria}
          statusLabel={copy.hero.taskComplete}
        />
      </Container>

      <SoftwareOffers
        eyebrow={copy.offers.eyebrow}
        title={copy.offers.title}
        items={copy.offers.items}
      />

      <Container variant="wide">
        <SoftwareProcess
          eyebrow={copy.process.eyebrow}
          title={copy.process.title}
          steps={copy.process.steps}
        />
      </Container>

      <Container variant="wide">
        <SoftwareProjects
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          lead={copy.projects.lead}
          cta={copy.projects.cta}
          href={copy.projects.href}
          empty={copy.projects.empty}
          error={copy.projects.error}
        />
      </Container>

      <SoftwareFinalCta
        title={copy.finalCta.title}
        lead={copy.finalCta.lead}
        button={copy.finalCta.button}
        href={copy.finalCta.href}
      />
    </div>
  )
}
