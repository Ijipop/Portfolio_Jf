'use client'

import Image from 'next/image'
import { Button, Container } from '@/components/public-v2/primitives'
import SupportContactForm from '@/components/support/SupportContactForm'
import {
  SUPPORT_CROSS_LINKS,
  SUPPORT_FORM_ANCHOR,
  SUPPORT_PAGE_COPY,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_PORTRAIT_SRC,
  SUPPORT_SMS_HREF,
} from '@/lib/public-v2/supportPageContent'
import SupportFormMuiIsland from './SupportFormMuiIsland'
import styles from './SupportPage.module.css'

const FORM_HREF = `#${SUPPORT_FORM_ANCHOR}`

/**
 * Landing soutien V2 — chrome Pop Atelier.
 * SupportContactForm MUI conservé (validation + POST /api/contact inchangés).
 * Îlot MUI minimal : pas de SiteDarkBackdrop ni sync document.
 */
export default function SupportPageClient() {
  const c = SUPPORT_PAGE_COPY

  return (
      <div className={styles.page}>
        <Container>
          <section className={styles.hero} aria-labelledby="support-hero-title">
            <div className={styles.portrait}>
              <Image
                className={styles.portraitImg}
                src={SUPPORT_PORTRAIT_SRC}
                alt={c.portraitAlt}
                width={264}
                height={264}
                priority
              />
            </div>
            <div className={styles.heroCopy}>
              <h1 id="support-hero-title" className={styles.heroTitle}>
                {c.h1}
              </h1>
              <p className={styles.heroLead}>{c.heroLead}</p>
              <p className={styles.identityName}>{c.identityName}</p>
              <p className={styles.identityMeta}>
                {c.identityTitle}
                <br />
                {c.identityPlace}
              </p>
              <div className={styles.heroActions}>
                <Button href={FORM_HREF} variant="primary">
                  {c.ctaPrimary}
                </Button>
                <Button href={SUPPORT_PHONE_HREF} variant="ghost">
                  {c.ctaCall} {SUPPORT_PHONE_DISPLAY}
                </Button>
              </div>
              <div className={styles.smsRow}>
                <a className={styles.smsLink} href={SUPPORT_SMS_HREF}>
                  {c.ctaText} {SUPPORT_PHONE_DISPLAY}
                </a>
                <span className={styles.phoneHint}>{c.phoneHint}</span>
              </div>
              <ul className={styles.trust}>
                {c.trustSignals.map((signal) => (
                  <li key={signal} className={styles.trustItem}>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="support-services-title">
            <div className={styles.sectionHeader}>
              <h2 id="support-services-title" className={styles.sectionTitle}>
                {c.serviceTitle}
              </h2>
              <p className={styles.sectionLead}>{c.serviceLead}</p>
            </div>
            <ul className={styles.pillars}>
              {c.pillars.map((pillar) => (
                <li key={pillar.id} className={styles.pillar}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarLead}>{pillar.lead}</p>
                  <ul className={styles.pillarItems}>
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="support-prices-title">
            <div className={styles.prices}>
              <h2 id="support-prices-title" className={styles.sectionTitle}>
                {c.pricesTitle}
              </h2>
              <p className={styles.pricesNote}>{c.pricesNote}</p>
              <ul className={styles.priceList}>
                {c.prices.map((row) => (
                  <li key={row.service} className={styles.priceRow}>
                    <span className={styles.priceService}>{row.service}</span>
                    {row.href ? (
                      <a className={styles.priceValue} href={row.href}>
                        {row.price}
                      </a>
                    ) : (
                      <span className={styles.priceValue}>{row.price}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className={styles.formSection}>
            <div className={styles.formIsland}>
              <SupportFormMuiIsland>
                <SupportContactForm />
              </SupportFormMuiIsland>
            </div>
          </div>

          <div className={styles.notes}>
            <section className={styles.note} aria-labelledby="support-reassurance-title">
              <h2 id="support-reassurance-title" className={styles.noteTitle}>
                {c.reassuranceTitle}
              </h2>
              <p className={styles.noteBody}>{c.reassurance}</p>
            </section>
            <section className={styles.note} aria-labelledby="support-travel-title">
              <h2 id="support-travel-title" className={styles.noteTitle}>
                {c.travelTitle}
              </h2>
              <p className={styles.noteBody}>{c.travelNote}</p>
            </section>
          </div>

          <nav className={styles.crossLinks} aria-label="Aussi disponible">
            <p className={styles.crossLabel}>Aussi disponible</p>
            <ul className={styles.crossList}>
              {SUPPORT_CROSS_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>

        <div className={styles.sticky}>
          <Button href={FORM_HREF} variant="primary" size="sm">
            {c.ctaPrimary}
          </Button>
        </div>
      </div>
  )
}
