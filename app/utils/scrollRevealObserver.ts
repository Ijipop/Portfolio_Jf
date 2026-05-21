type ScrollRevealCallback = (entry: IntersectionObserverEntry) => void

const callbacks = new WeakMap<Element, ScrollRevealCallback>()

let sharedObserver: IntersectionObserver | null = null

function getSharedObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry)
      }
    },
    {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: [0, 0.04, 0.08, 0.12, 0.2],
    }
  )

  return sharedObserver
}

export function observeScrollReveal(el: Element, cb: ScrollRevealCallback): () => void {
  callbacks.set(el, cb)
  getSharedObserver().observe(el)
  return () => {
    callbacks.delete(el)
    sharedObserver?.unobserve(el)
  }
}
