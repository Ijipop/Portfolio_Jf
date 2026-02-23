'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Locale } from '../i18n/translations'

type TranslationKey = string

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : undefined
}

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-locale'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved === 'fr' || saved === 'en') setLocaleState(saved)
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, newLocale)
  }

  // SSR + premier rendu client : toujours 'fr' pour éviter hydration mismatch et flash EN
  const isServer = typeof window === 'undefined'
  const resolvedLocale: Locale = (isServer || !mounted) ? 'fr' : locale

  const t = (key: TranslationKey): string => {
    const dict = translations[resolvedLocale] as Record<string, unknown>
    const value = getNested(dict, key)
    return value ?? key
  }

  return (
    <LanguageContext.Provider value={{ locale: resolvedLocale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
