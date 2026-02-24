'use client'

import BaseCard from './BaseCard'
import { ReactNode } from 'react'

interface ProjectCardProps {
  children: ReactNode
  onClick?: () => void
  reflectionColor?: string
}

export default function ProjectCard({ children, onClick, reflectionColor }: ProjectCardProps) {
  return (
    <BaseCard
      variant="default"
      onClick={onClick}
      reflectionColor={reflectionColor}
      height={{ xs: 280, sm: 320, md: 400 }}
    >
      {children}
    </BaseCard>
  )
}

