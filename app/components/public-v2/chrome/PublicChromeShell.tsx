import type { ReactNode } from 'react'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PUBLIC_V2_MAIN_ID } from '@/lib/public-v2/nav'
import PublicFooter from './PublicFooter'
import PublicHeader from './PublicHeader'

export type PublicChromeShellProps = {
  pathname: string
  children: ReactNode
  /** Id du `<main>` — défaut `pv2-main` (accueil). */
  mainId?: string
  mainTestId?: string
  className?: string
}

/**
 * Chrome public V2 minimal : ThemeRoot + Header + main + Footer.
 * Une seule balise main ; pas de MUI / Prisma / ContactFab.
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
      <a className="pv2-skip" href={`#${mainId}`}>
        Aller au contenu
      </a>
      <PublicHeader pathname={pathname} />
      <main id={mainId} data-testid={mainTestId}>
        {children}
      </main>
      <PublicFooter pathname={pathname} />
    </PublicThemeRoot>
  )
}
