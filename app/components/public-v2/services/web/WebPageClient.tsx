'use client'

import { Container } from '@/components/public-v2/primitives'
import { getWebEditorialContent } from '@/lib/public-v2/webEditorialContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import WebHeroBuild from './WebHeroBuild'
import WebOffersBuild from './WebOffersBuild'
import WebProcessTrack from './WebProcessTrack'
import WebProjectsPreview from './WebProjectsPreview'
import WebFinalCtaBuild from './WebFinalCtaBuild'
import styles from './WebPage.module.css'
import './webBuild.css'

export default function WebPageClient() {
  const locale = usePublicV2Locale()
  const copy = getWebEditorialContent(locale)

  return (
    <div className={styles.page} data-testid="pv2-web-page">
      <Container variant="wide">
        <WebHeroBuild
          eyebrow={copy.hero.eyebrow}
          title={copy.hero.title}
          lead={copy.hero.lead}
          ctaProjects={copy.hero.ctaProjects}
          ctaContact={copy.hero.ctaContact}
          projectsHref={copy.hero.projectsHref}
          contactHref={copy.hero.contactHref}
          ariaLabel={copy.hero.buildAria}
          browserLabels={{
            tracing: copy.hero.browserTracing,
            structuring: copy.hero.browserStructuring,
            revealing: copy.hero.browserRevealing,
          }}
          browserLive={copy.hero.browserLive}
        />
      </Container>

      <WebOffersBuild
        eyebrow={copy.offers.eyebrow}
        title={copy.offers.title}
        items={copy.offers.items}
      />

      <Container variant="wide">
        <WebProcessTrack
          eyebrow={copy.process.eyebrow}
          title={copy.process.title}
          steps={copy.process.steps}
        />
      </Container>

      <Container variant="wide">
        <WebProjectsPreview
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          lead={copy.projects.lead}
          cta={copy.projects.cta}
          href={copy.projects.href}
          empty={copy.projects.empty}
          error={copy.projects.error}
        />
      </Container>

      <WebFinalCtaBuild
        title={copy.finalCta.title}
        lead={copy.finalCta.lead}
        button={copy.finalCta.button}
        href={copy.finalCta.href}
      />
    </div>
  )
}
