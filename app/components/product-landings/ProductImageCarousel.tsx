'use client'

import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const AUTOPLAY_MS = 4500

type ProductImageCarouselProps = {
  /** Ex. `/img/cpu-ze` — charge `gallery.json` dans ce dossier. */
  galleryBasePath: string
  emptyMessage: string
  /** fade = CPU-ZE ; slide = Space Taker */
  motionStyle?: 'fade' | 'slide'
  accent: string
}

export default function ProductImageCarousel({
  galleryBasePath,
  emptyMessage,
  motionStyle = 'fade',
  accent,
}: ProductImageCarouselProps) {
  const [slides, setSlides] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [paused, setPaused] = useState(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    const base = galleryBasePath.replace(/\/$/, '')
    fetch(`${base}/gallery.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return
        const urls = data
          .filter((f: unknown) => typeof f === 'string')
          .map((f: string) => {
            const name = f.replace(/^\/+/, '')
            return name.startsWith('http') || name.startsWith('/') ? name : `${base}/${name}`
          })
          .filter((u: string) => /\.(png|jpe?g|webp|gif)$/i.test(u))
        setSlides(urls)
        setIndex(0)
        setFailedSrc(null)
      })
      .catch(() => {
        if (!cancelled) setSlides([])
      })
    return () => {
      cancelled = true
    }
  }, [galleryBasePath])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mq.matches
    const onChange = () => {
      reducedMotionRef.current = mq.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = useCallback(
    (dir: -1 | 1) => {
      if (slides.length === 0) return
      setDirection(dir)
      setIndex((i) => (i + dir + slides.length) % slides.length)
    },
    [slides.length],
  )

  const goTo = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }, [index])

  useEffect(() => {
    if (slides.length < 2 || lightboxOpen || paused || reducedMotionRef.current) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [slides.length, lightboxOpen, paused, go])

  const current = slides[index]
  const showImage = current && current !== failedSrc

  if (slides.length === 0) {
    return (
      <Box
        sx={{
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.12)',
          bgcolor: 'rgba(0,0,0,0.28)',
          minHeight: { xs: 220, md: 300 },
          display: 'grid',
          placeItems: 'center',
          px: 3,
        }}
      >
        <Typography sx={{ opacity: 0.7, textAlign: 'center', maxWidth: 360, lineHeight: 1.6 }}>
          {emptyMessage}
        </Typography>
      </Box>
    )
  }

  const variants =
    motionStyle === 'slide'
      ? {
          enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
        }
      : {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        }

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          bgcolor: 'rgba(0,0,0,0.35)',
          aspectRatio: '16 / 10',
          cursor: showImage ? 'zoom-in' : 'default',
        }}
        onClick={() => showImage && setLightboxOpen(true)}
        role={showImage ? 'button' : undefined}
        tabIndex={showImage ? 0 : undefined}
        onKeyDown={(e) => {
          if (!showImage) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setLightboxOpen(true)
          }
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {showImage ? (
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image
                src={current}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 720px"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                onError={() => setFailedSrc(current)}
                unoptimized={current.endsWith('.gif')}
              />
            </motion.div>
          ) : (
            <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <Typography sx={{ opacity: 0.65 }}>{emptyMessage}</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {slides.length > 1 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            mt: 1.75,
          }}
        >
          <IconButton
            aria-label="Previous"
            onClick={() => go(-1)}
            sx={{ color: 'inherit', border: '1px solid rgba(255,255,255,0.16)' }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ fontSize: '0.85rem', opacity: 0.7, minWidth: 48, textAlign: 'center' }}>
            {index + 1} / {slides.length}
          </Typography>
          <IconButton
            aria-label="Next"
            onClick={() => go(1)}
            sx={{ color: 'inherit', border: '1px solid rgba(255,255,255,0.16)' }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      ) : null}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 1.25 }}>
        {slides.map((src, i) => (
          <Box
            key={src}
            component="button"
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            sx={{
              width: i === index ? 18 : 8,
              height: 8,
              borderRadius: 99,
              border: 'none',
              cursor: 'pointer',
              bgcolor: i === index ? accent : 'rgba(255,255,255,0.28)',
              transition: 'width 0.25s ease, background 0.25s ease',
            }}
          />
        ))}
      </Box>

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#0a0a0c', backgroundImage: 'none' } }}
      >
        <IconButton
          aria-label="Close"
          onClick={() => setLightboxOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 2, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
        {showImage ? (
          <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
            <Image src={current} alt="" fill sizes="100vw" style={{ objectFit: 'contain' }} />
          </Box>
        ) : null}
      </Dialog>
    </Box>
  )
}
