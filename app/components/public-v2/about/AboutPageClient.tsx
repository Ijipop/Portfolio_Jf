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
          <Heading as="h1" variant="section">
            {c.title}
          </Heading>
        </header>

        <section className={styles.identity} aria-labelledby="about-identity-name">
          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src={c.portrait.src}
              alt={c.portrait.alt}
              width={c.portrait.width}
              height={c.portrait.height}
              priority
              sizes="(max-width: 768px) 80vw, 288px"
            />
          </div>
          <div className={styles.identityCopy}>
            <h2 id="about-identity-name" className={styles.identityName}>
              {c.identityName}
            </h2>
            <p className={styles.identityRole}>{c.identityRole}</p>
            <p className={styles.identityLead}>{c.lead}</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="about-story-title">
          <h2 id="about-story-title" className={styles.sectionTitle}>
            {c.storyTitle}
          </h2>
          {c.storyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={styles.sectionBody}>
              {paragraph}
            </p>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="about-working-title">
          <h2 id="about-working-title" className={styles.sectionTitle}>
            {c.workingTitle}
          </h2>
          {c.workingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={styles.sectionBody}>
              {paragraph}
            </p>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="about-formation-title">
          <h2 id="about-formation-title" className={styles.sectionTitle}>
            {c.formationTitle}
          </h2>
          <ul className={styles.list}>
            {c.formationItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.toolsSection} aria-labelledby="about-tools-title">
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

        <section className={styles.ctaBand} aria-labelledby="about-cta-title">
          <h2 id="about-cta-title" className={styles.sectionTitle}>
            {c.ctaTitle}
          </h2>
          <p className={styles.sectionBody}>{c.ctaBody}</p>
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
