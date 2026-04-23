import type { ReactNode } from 'react'
import styles from './DemoResponsiveTopNav.module.css'

export type DemoResponsiveTopNavProps = {
  brand: ReactNode
  navAriaLabel: string
  menuSummaryLabel: string
  /** Classes merged onto the desktop nav (layout, typo, link colors). */
  desktopNavClassName: string
  /** Optional vertical stack for the mobile panel nav (e.g. column + spacing). */
  panelNavClassName?: string
  /** Extra class on the dropdown surface (theme: dark / light). */
  panelSurfaceClassName?: string
  /** Préréglage panneau sombre pour vitrines tech / spectacle. */
  panelVariant?: 'default' | 'tech' | 'spectacle'
  /** Extra class on the hamburger button (e.g. dark header). */
  summaryClassName?: string
  /** Style du bouton menu (clair / SaaS / théâtre). */
  summaryTone?: 'light' | 'dark' | 'spectacle'
  children: ReactNode
}

/**
 * Nav desktop + menu disclosure mobile (sans client JS) pour les vitrines démo.
 * Les enfants sont rendus deux fois (desktop + panneau) — liens statiques uniquement.
 */
export default function DemoResponsiveTopNav({
  brand,
  navAriaLabel,
  menuSummaryLabel,
  desktopNavClassName,
  panelNavClassName,
  panelSurfaceClassName,
  panelVariant = 'default',
  summaryClassName,
  summaryTone = 'light',
  children,
}: DemoResponsiveTopNavProps) {
  const panelNav = panelNavClassName ?? desktopNavClassName
  const panelPreset =
    panelVariant === 'tech'
      ? styles.panelSurfaceDark
      : panelVariant === 'spectacle'
        ? styles.panelSurfaceSpectacle
        : ''
  return (
    <>
      {brand}
      <details className={styles.mobileMenu}>
        <summary
          className={`${styles.hamburger} ${summaryTone === 'dark' ? styles.hamburgerDark : ''} ${summaryTone === 'spectacle' ? styles.hamburgerSpectacle : ''} ${summaryClassName ?? ''}`.trim()}
          aria-label={menuSummaryLabel}
        >
          <span className={styles.hamburgerLines} aria-hidden>
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </span>
        </summary>
        <div
          className={`${styles.panelSurface} ${panelPreset} ${panelSurfaceClassName ?? ''}`.trim()}
        >
          <nav className={panelNav} aria-label={navAriaLabel}>
            {children}
          </nav>
        </div>
      </details>
      <nav className={`${styles.desktopNav} ${desktopNavClassName}`.trim()} aria-label={navAriaLabel}>
        {children}
      </nav>
    </>
  )
}
