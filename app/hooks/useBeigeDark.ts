'use client'

import { useCallback, useSyncExternalStore } from 'react'
import {
  getBeigeDark,
  setBeigeDark as setBeigeDarkStore,
  subscribeBeigeDark,
} from '@/utils/beigeDarkModeStore'

function subscribe(callback: () => void) {
  return subscribeBeigeDark(() => callback())
}

function getSnapshot() {
  return getBeigeDark()
}

function getServerSnapshot() {
  return true
}

export function useBeigeDark() {
  const beigeDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setBeigeDark = useCallback((enabled: boolean) => {
    setBeigeDarkStore(enabled)
  }, [])

  const toggleBeigeDark = useCallback(() => {
    setBeigeDarkStore(!getBeigeDark())
  }, [])

  return { beigeDark, setBeigeDark, toggleBeigeDark }
}
