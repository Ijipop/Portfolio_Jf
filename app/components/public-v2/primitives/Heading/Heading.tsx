import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Heading.module.css'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
export type HeadingVariant = 'display' | 'section' | 'card'

export type HeadingProps = {
  /** HTML heading level (document outline). */
  as?: HeadingLevel
  /** Visual presentation — independent from `as`. */
  variant?: HeadingVariant
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLHeadingElement>, 'className' | 'children'>

export default function Heading({
  as: Tag = 'h2',
  variant = 'section',
  className,
  children,
  ...rest
}: HeadingProps) {
  const cls = [styles.root, styles[variant], className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} data-pv2-heading={variant} {...rest}>
      {children}
    </Tag>
  )
}
