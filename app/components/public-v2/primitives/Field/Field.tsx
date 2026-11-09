import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import styles from './Field.module.css'

type FieldShellProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

export function FieldShell({ id, label, required, error, hint, children }: FieldShellProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {/* describedBy applied by child via clone-less pattern: parent passes attrs */}
      <div data-describedby={describedBy || undefined}>{children}</div>
      {hint && !error ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string
  label: string
  error?: string
  hint?: string
}

export function TextField({ id, label, error, hint, required, className, ...rest }: TextFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        className={[styles.control, className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export type TextAreaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  id: string
  label: string
  error?: string
  hint?: string
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: TextAreaFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      <textarea
        id={id}
        className={[styles.control, styles.textarea, className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export type SwitchFieldProps = {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (next: boolean) => void
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'onClick'>

export function SwitchField({ id, label, checked, onCheckedChange, ...rest }: SwitchFieldProps) {
  return (
    <div className={styles.switchRow}>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        data-on={checked ? 'true' : 'false'}
        className={styles.switch}
        onClick={() => onCheckedChange(!checked)}
        {...rest}
      >
        <span className={styles.switchKnob} aria-hidden="true" />
      </button>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
