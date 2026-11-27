'use client'

import { Button, Container } from '@/components/public-v2/primitives'
import SupportContactForm from '@/components/support/SupportContactForm'
import {
  getSupportCrossLinks,
  getSupportPageCopy,
  SUPPORT_FORM_ANCHOR,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
} from '@/lib/public-v2/supportPageContent'
import { getSupportEditorialContent } from '@/lib/public-v2/supportEditorialContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import SupportFormMuiIsland from './SupportFormMuiIsland'
import SupportHeroAssembly from './SupportHeroAssembly'
import SupportStickyCta from './SupportStickyCta'
import styles from './SupportPage.module.css'

const FORM_HREF = `#${SUPPORT_FORM_ANCHOR}`

export default function SupportPageClient() {
  const locale = usePublicV2Locale()
  const editorial = getSupportEditorialContent(locale)
  const formCopy = getSupportPageCopy(locale)
  const crossLinks = getSupportCrossLinks(locale)
  const crossNavLabel = locale === 'en' ? 'Also available' : 'Aussi disponible'

  return (
    <div className={styles.page}>
      <Container variant="wide">
        <header className={styles.hero} aria-labelledby="support-hero-title">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{editorial.hero.eyebrow}</p>
              <h1 id="support-hero-title" className={styles.heroTitle}>
                <span className={styles.heroTitleLine}>{editorial.hero.titleLine1}</span>
                <span className={styles.heroTitleLineAccent}>{editorial.hero.titleLine2}</span>
              </h1>
              <div className={styles.heroBody}>
                <p className={styles.heroLead}>{editorial.hero.lead}</p>
                <div className={styles.heroActions}>
                  <Button href={FORM_HREF} variant="primary">
                    {editorial.hero.ctaForm}
                    <span className={styles.ctaArrow} aria-hidden>
                      ↗
                    </span>
                  </Button>
                  <Button href={SUPPORT_PHONE_HREF} variant="ghost">
                    {editorial.hero.ctaCall}{' '}
                    <span className={styles.phoneInline}>{SUPPORT_PHONE_DISPLAY}</span>
                  </Button>
                </div>
                <p className={styles.phoneHint}>{editorial.hero.phoneHint}</p>
                <p className={styles.signature}>
                  <span className={styles.signatureName}>{editorial.hero.signatureName}</span>
                  <span className={styles.signatureMeta}>
                    {editorial.hero.signatureTitle}
                    <span className={styles.signatureDot} aria-hidden>
                      ·
                    </span>
                    {editorial.hero.signaturePlace}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <SupportHeroAssembly
                statusLabel={editorial.hero.systemOperational}
                labels={{
                  assembling: editorial.hero.assemblyInProgress,
                  diagnosing: editorial.hero.checkingComponents,
                  booting: editorial.hero.startingSystem,
                }}
                ariaLabel={editorial.hero.assemblyAria}
              />
            </div>
          </div>
        </header>
      </Container>

      <section
        className={styles.servicesBand}
        aria-labelledby="support-services-title"
      >
        <Container variant="wide">
          <div className={styles.servicesIntro}>
            <p className={styles.sectionEyebrow}>{editorial.services.eyebrow}</p>
            <h2 id="support-services-title" className={styles.sectionTitle}>
              {editorial.services.title}
            </h2>
            <p className={styles.sectionLead}>{editorial.services.lead}</p>
          </div>
          <ol className={styles.serviceList}>
            {editorial.services.domains.map((domain, index) => (
              <li
                key={domain.id}
                className={[
                  styles.serviceRow,
                  domain.tone === 'accent' ? styles.serviceRowAccent : '',
                  index % 2 === 1 ? styles.serviceRowOffset : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className={styles.serviceNum} aria-hidden>
                  {domain.num}
                </span>
                <div className={styles.serviceBody}>
                  <h3 className={styles.serviceName}>{domain.title}</h3>
                  <p className={styles.serviceLead}>{domain.lead}</p>
                  <ul className={styles.serviceExamples}>
                    {domain.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {domain.aside ? (
                    <p className={styles.serviceAside}>{domain.aside}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container variant="wide">
        <section className={styles.process} aria-labelledby="support-process-title">
          <div className={styles.processHeader}>
            <h2 id="support-process-title" className={styles.sectionTitle}>
              {editorial.process.title}
            </h2>
            <p className={styles.sectionLead}>{editorial.process.lead}</p>
          </div>
          <ol className={styles.processSteps}>
            {editorial.process.steps.map((step, index) => (
              <li key={step.num} className={styles.processStep}>
                <span className={styles.processNum}>{step.num}</span>
                <div className={styles.processCopy}>
                  <h3 className={styles.processStepTitle}>{step.title}</h3>
                  <p className={styles.processStepBody}>{step.body}</p>
                </div>
                {index < editorial.process.steps.length - 1 ? (
                  <span className={styles.processLink} aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.trust} aria-labelledby="support-trust-title">
          <div className={styles.trustMain}>
            <p className={styles.trustKicker}>{editorial.trust.kicker}</p>
            <h2 id="support-trust-title" className={styles.trustTitle}>
              {editorial.trust.title}
            </h2>
            <ul className={styles.trustList}>
              {editorial.trust.statements.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <blockquote className={styles.trustQuote}>
            <p className={styles.trustQuoteLabel}>{editorial.trust.quoteTitle}</p>
            <p className={styles.trustQuoteBody}>{editorial.trust.quote}</p>
            <footer className={styles.trustScope}>
              <strong>{editorial.trust.scopeTitle}</strong>
              <span>{editorial.trust.scope}</span>
            </footer>
          </blockquote>
        </section>

        <p className={styles.pricingNote}>{editorial.pricingNote}</p>

        <section
          className={styles.contact}
          aria-labelledby="support-contact-title"
        >
          <div className={styles.contactIntro}>
            <h2 id="support-contact-title" className={styles.contactTitle}>
              {editorial.contact.title}
            </h2>
            <p className={styles.contactLead}>{editorial.contact.lead}</p>
            <p className={styles.contactFormHint}>{formCopy.formTitle}</p>
          </div>
          <div className={styles.formShell}>
            <SupportFormMuiIsland>
              <SupportContactForm />
            </SupportFormMuiIsland>
          </div>
        </section>

        <nav className={styles.crossLinks} aria-label={crossNavLabel}>
          <p className={styles.crossLabel}>{crossNavLabel}</p>
          <ul className={styles.crossList}>
            {crossLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <SupportStickyCta label={editorial.hero.ctaForm} />
    </div>
  )
}