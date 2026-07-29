'use client'

import type { ReactNode } from 'react'
import AppBarComponent from '@/components/appBar'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/shared/PageWrapper'

type ProductLandingShellProps = {
  children: ReactNode
  /** Classe CSS sur le main (thème produit). */
  mainClassName?: string
}

/** Chrome minimal commun — AppBar + Footer ; le look vient du CSS module produit. */
export default function ProductLandingShell({ children, mainClassName }: ProductLandingShellProps) {
  return (
    <PageWrapper backgroundVariant="default">
      <AppBarComponent />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </PageWrapper>
  )
}
