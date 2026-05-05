import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timelendr — merci',
  description: 'Confirmation après souscription Timelendr.',
  robots: { index: false, follow: false },
}

export default function TimelendrMerciLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
