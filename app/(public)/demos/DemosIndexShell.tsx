'use client'

import AppBarComponent from '@/components/appBar'
import PageWrapper from '@/components/shared/PageWrapper'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import styles from './DemosIndex.module.css'

export default function DemosIndexShell({ children }: { children: React.ReactNode }) {
  const siteDarkChrome = useSiteDarkChrome()

  return (
    <PageWrapper backgroundVariant="default" showRadialOverlay={false}>
      <AppBarComponent />
      <div
        className={styles.shell}
        data-demos-theme={siteDarkChrome ? 'dark' : 'light'}
      >
        {children}
      </div>
    </PageWrapper>
  )
}
