import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EvePics – One-pager A4',
  description: 'Event photo wall – digital photobooth, live display, full-quality downloads.',
}

export default function PromoOnePagerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
