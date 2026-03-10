import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EvePics – Business card',
  description: 'EvePics.eu – Collect every picture from your event.',
}

export default function PromoBusinessCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
