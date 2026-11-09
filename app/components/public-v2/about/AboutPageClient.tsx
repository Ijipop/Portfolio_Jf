import Image from 'next/image'
import { Button, Container, Heading } from '@/components/public-v2/primitives'
import { ABOUT_PAGE_COPY, ABOUT_PAGE_SKILLS } from '@/lib/public-v2/aboutPageContent'
import styles from './AboutPage.module.css'

export default function AboutPageClient() {
  const c = ABOUT_PAGE_COPY

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Portrait</p>
          <Heading as="h1" variant="section" className={styles.pageTitle}>
            {c.title}
          </Heading>
        </header>

        <section className={styles.identity} aria-labelledby="about-identity-name">
          <div className={styles.portraitStage}>
            <div className={styles.portraitGlow} aria-hidden />
            <div className={styles.portraitFrame}>
              <Image
                className={styles.portrait}
                src={c.portrait.src}
                alt={c.portrait.alt}
                width={c.portrait.width}
                height={c.portrait.height}
                priority
                sizes="(max-width: 768px) 80vw, 320px"
              />
            </div>
          </div>
          <div className={styles.identityCopy}>
            <h2 id="about-identity-name" className={styles.identityName}>
              {c.identityName}
            </h2>
            <p className={styles.identityRole}>{c.identityRole}</p>
            <p className={styles.identityLead}>{c.lead}</p>
          </div>
        </section>

        <section className={styles.storySection} aria-labelledby="about-story-title">
          <div className={styles.storyPanel}>
            <h2 id="about-story-title" className={styles.storyTitle}>
              {c.storyTitle}
            </h2>
            {c.storyParagraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 48)}
                className={[
                  styles.storyBody,
                  index === c.storyParagraphs.length - 1 ? styles.storyClosing : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className={styles.workingSection} aria-labelledby="about-working-title">
          <h2 id="about-working-title" className={styles.sectionTitle}>
            {c.workingTitle}
          </h2>
          <div className={styles.workingGrid}>
            {c.workingParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={styles.workingBody}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <div className={styles.metaBlock}>
          <section className={styles.formationCard} aria-labelledby="about-formation-title">
            <h2 id="about-formation-title" className={styles.metaTitle}>
              {c.formationTitle}
            </h2>
            <ul className={styles.list}>
              {c.formationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.toolsCard} aria-labelledby="about-tools-title">
            <h2 id="about-tools-title" className={styles.toolsTitle}>
              {c.toolsTitle}
            </h2>
            <ul className={styles.tools}>
              {ABOUT_PAGE_SKILLS.map((skill) => (
                <li key={skill} className={styles.tool}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.ctaBand} aria-labelledby="about-cta-title">
          <div className={styles.ctaAccent} aria-hidden />
          <h2 id="about-cta-title" className={styles.ctaTitle}>
            {c.ctaTitle}
          </h2>
          <p className={styles.ctaBody}>{c.ctaBody}</p>
          <div className={styles.ctaActions}>
            <Button href={c.ctaContactHref} variant="primary">
              {c.ctaContact}
            </Button>
            <Button href={c.ctaProjectsHref} variant="ghost">
              {c.ctaProjects}
            </Button>
          </div>
        </section>
      </Container>
    </div>
  )
}
