import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import styles from './Section.module.css'

export type SectionVariant = 'default' | 'wash' | 'ink'

export type SectionProps = {
  variant?: SectionVariant
  as?: ElementType
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

export default function Section({
  variant = 'default',
  as: Tag = 'section',
  className,
  children,
  ...rest
}: SectionProps) {
  const cls = [styles.root, styles[variant], className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} data-pv2-section={variant} {...rest}>
      {children}
    </Tag>
  )
}
