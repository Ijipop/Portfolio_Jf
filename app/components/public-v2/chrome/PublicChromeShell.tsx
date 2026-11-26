import type { ReactNode } from 'react'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PUBLIC_V2_MAIN_ID } from '@/lib/public-v2/nav'
import PublicChromeI18n from './PublicChromeI18n'
import PublicFooter from './PublicFooter'
import PublicHeader from './PublicHeader'
import PublicSkipLink from './PublicSkipLink'

export type PublicChromeShellProps = {
  pathname: string
  children: ReactNode
  /** Id du `<main>` — défaut `pv2-main` (accueil). */
  mainId?: string
  mainTestId?: string
  className?: string
}

/**
 * Chrome public V2 minimal : ThemeRoot + i18n provider + Header + main + Footer.
 * Une seule balise main ; pas de MUI / Prisma / ContactFab.
 * Toggle FR/EN masqué tant que NEXT_PUBLIC_I18N_TOGGLE_ENABLED !== 'true'.
 */
export default function PublicChromeShell({
  pathname,
  children,
  mainId = PUBLIC_V2_MAIN_ID,
  mainTestId,
  className,
}: PublicChromeShellProps) {
  return (
    <PublicThemeRoot className={className}>
      <PublicChromeI18n>
        <PublicSkipLink mainId={mainId} />
        <PublicHeader pathname={pathname} />
        <main id={mainId} data-testid={mainTestId}>
          {children}
        </main>
        <PublicFooter pathname={pathname} />
      </PublicChromeI18n>
    </PublicThemeRoot>
  )
}
