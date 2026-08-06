'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { motion, type Variants } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './DeskDotLanding.module.css'

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.12 },
  },
}

const line: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function FinaleLine({ className }: { className: string }) {
  const { t } = useLanguage()
  return (
    <span className={className}>
      {t('deskDot.pitchLine4Before')}
      <span className={styles.pitchMagic}>{t('deskDot.pitchMagic')}</span>
      {t('deskDot.pitchLine4After')}
    </span>
  )
}

/** H2 vendeur animé — phrases en cascade, « magie » en accent. */
export default function DeskDotPitchTitle() {
  const { t } = useLanguage()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  if (reducedMotion) {
    return (
      <h2 className={styles.pitchTitle} aria-label={t('deskDot.pitchAria')}>
        <span className={styles.pitchLine}>{t('deskDot.pitchLine1')}</span>
        <span className={styles.pitchLine}>{t('deskDot.pitchLine2')}</span>
        <span className={styles.pitchLine}>{t('deskDot.pitchLine3')}</span>
        <FinaleLine className={styles.pitchLine} />
      </h2>
    )
  }

  return (
    <motion.h2
      className={styles.pitchTitle}
      variants={stagger}
      initial="hidden"
      animate="show"
      aria-label={t('deskDot.pitchAria')}
    >
      <motion.span className={styles.pitchLine} variants={line}>
        {t('deskDot.pitchLine1')}
      </motion.span>
      <motion.span className={styles.pitchLine} variants={line}>
        {t('deskDot.pitchLine2')}
      </motion.span>
      <motion.span className={styles.pitchLine} variants={line}>
        {t('deskDot.pitchLine3')}
      </motion.span>
      <motion.span className={styles.pitchLine} variants={line}>
        {t('deskDot.pitchLine4Before')}
        <span className={styles.pitchMagic}>{t('deskDot.pitchMagic')}</span>
        {t('deskDot.pitchLine4After')}
      </motion.span>
    </motion.h2>
  )
}
