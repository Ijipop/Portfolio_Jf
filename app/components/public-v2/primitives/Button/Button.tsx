import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'ghost' | 'emphasis'
export type ButtonSize = 'sm' | 'md'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  /** Attributs de construction page Web (BuildSlot) */
  'data-slot'?: string
  'data-btn'?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel' | 'aria-label' | 'onClick'
  > & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function classNames(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [styles.root, styles[variant], styles[size], className].filter(Boolean).join(' ')
}

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary'
  const size = props.size ?? 'md'
  const cls = classNames(variant, size, props.className)

  const dataSlot = props['data-slot']
  const dataBtn = props['data-btn']

  const dataProps = {
    ...(dataSlot ? { 'data-slot': dataSlot } : {}),
    ...(dataBtn ? { 'data-btn': dataBtn } : {}),
  }

  if ('href' in props && props.href) {
    const {
      href,
      children,
      target,
      rel,
      className: _c,
      variant: _v,
      size: _s,
      'data-slot': _ds,
      'data-btn': _db,
      ...rest
    } = props
    const absoluteHttp = /^https?:\/\//i.test(href)
    const protocolOrHash = /^(tel:|sms:|mailto:)/i.test(href) || href.startsWith('#')
    if (absoluteHttp || protocolOrHash) {
      return (
        <a
          className={cls}
          href={href}
          target={absoluteHttp ? (target ?? '_blank') : target}
          rel={absoluteHttp ? (rel ?? 'noopener noreferrer') : rel}
          {...dataProps}
          {...rest}
        >
          {children}
        </a>
      )
    }
    return (
      <Link className={cls} href={href} target={target} rel={rel} {...dataProps} {...rest}>
        {children}
      </Link>
    )
  }

  const buttonProps = props as ButtonAsButton
  const {
    children,
    className: _c,
    variant: _v,
    size: _s,
    type,
    'data-slot': _ds2,
    'data-btn': _db2,
    ...rest
  } = buttonProps
  return (
    <button className={cls} type={type ?? 'button'} {...dataProps} {...rest}>
      {children}
    </button>
  )
}
