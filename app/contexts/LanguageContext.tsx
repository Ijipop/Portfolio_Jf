'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { fr, loadTranslationDict, type Locale, type TranslationDict } from '../i18n/translations'

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
  const [dict, setDict] = useState<TranslationDict>(fr as TranslationDict)

  const applyLocale = useCallback(async (next: Locale) => {
    setLocaleState(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next)
    }
    const loaded = await loadTranslationDict(next)
    setDict(loaded)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    const initial: Locale = saved === 'en' ? 'en' : 'fr'
    if (initial === 'en') {
      void loadTranslationDict('en').then(setDict)
      setLocaleState('en')
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback(
    (newLocale: Locale) => {
      void applyLocale(newLocale)
    },
    [applyLocale],
  )

  const isServer = typeof window === 'undefined'
  const resolvedLocale: Locale = isServer || !mounted ? 'fr' : locale

  // FR: toujours le module importé (évite un dict state périmé après HMR de locales/fr.ts).
  // EN: dict chargé à la demande.
  const activeDict: TranslationDict =
    isServer || !mounted || resolvedLocale === 'fr' ? (fr as TranslationDict) : dict

  const t = useCallback(
    (key: TranslationKey): string => {
      const value = getNested(activeDict as Record<string, unknown>, key)
      return value ?? key
    },
    [activeDict],
  )

  const value = useMemo(
    () => ({ locale: resolvedLocale, setLocale, t }),
    [resolvedLocale, setLocale, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
