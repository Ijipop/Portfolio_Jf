'use client'

import BaseCard from './BaseCard'
import { ReactNode } from 'react'

interface ContactCardProps {
  children: ReactNode
  onClick?: () => void
}

export default function ContactCard({ children, onClick }: ContactCardProps) {
  return (
    <BaseCard variant="3d" onClick={onClick}>
      {children}
    </BaseCard>
  )
}

