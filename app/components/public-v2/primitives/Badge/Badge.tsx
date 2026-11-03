import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'personal'

export type BadgeProps = {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children'>

export default function Badge({
  variant = 'neutral',
  className,
  children,
  ...rest
}: BadgeProps) {
  const cls = [styles.root, styles[variant], className].filter(Boolean).join(' ')
  return (
    <span className={cls} data-pv2-badge={variant} {...rest}>
      {children}
    </span>
  )
}
