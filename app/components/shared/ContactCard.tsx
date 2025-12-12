'use client'

import BaseCard from './BaseCard'
import { ReactNode } from 'react'

interface ContactCardProps {
  children: ReactNode
}

export default function ContactCard({ children }: ContactCardProps) {
  return (
    <BaseCard variant="default">
      {children}
    </BaseCard>
  )
}

