import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import styles from './Container.module.css'

export type ContainerVariant = 'content' | 'wide'

export type ContainerProps = {
  variant?: ContainerVariant
  as?: ElementType
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

export default function Container({
  variant = 'content',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  const cls = [styles.root, styles[variant], className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} data-pv2-container={variant} {...rest}>
      {children}
    </Tag>
  )
}
