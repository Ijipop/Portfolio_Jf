'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const AUTOPLAY_MS = 4500

const GALLERY_CAP_KEYS = [
  'timelendr.galleryCap1',
  'timelendr.galleryCap2',
  'timelendr.galleryCap3',
  'timelendr.galleryCap4',
  'timelendr.galleryCap5',
  'timelendr.galleryCap6',
  'timelendr.galleryCap7',
  'timelendr.galleryCap8',
] as const

type Props = {
  title: string
  emptyMessage: string
  variant?: 'default' | 'hero'
  hideTitle?: boolean
}

export default function TimelendrCarousel({
  title,
  emptyMessage,
  hideTitle = false,
}: Props) {
  const { t } = useLanguage()
  const [slides, setSlides] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    fetch('/img/timelendr/gallery.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return
        const urls = data
          .filter((f: unknown) => typeof f === 'string' && f.endsWith('.png'))
          .map((f: string) => `/img/timelendr/${f.replace(/^\/+/, '')}`)
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
  }, [])

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
      setIndex((i) => (i + dir + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    if (slides.length < 2 || lightboxOpen || paused || reducedMotionRef.current) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [slides.length, lightboxOpen, paused, go])

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

  const current = slides[index]
  const showImage = Boolean(current && current !== failedSrc)

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      {!hideTitle ? (
        <Typography sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>{title}</Typography>
      ) : null}

      <Box
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
        sx={{
          position: 'relative',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          bgcolor: 'rgba(0,0,0,0.35)',
          aspectRatio: '16 / 10',
          cursor: showImage ? 'zoom-in' : 'default',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {showImage ? (
              <Image
                src={current}
                alt={index < GALLERY_CAP_KEYS.length ? t(GALLERY_CAP_KEYS[index]) : title}
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                priority={index === 0}
                onError={() => setFailedSrc(current)}
              />
            ) : (
              <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <Typography sx={{ opacity: 0.65 }}>{emptyMessage}</Typography>
              </Box>
            )}
          </motion.div>
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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`cap-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Typography
            component="p"
            sx={{
              textAlign: 'center',
              opacity: 0.82,
              lineHeight: 1.55,
              px: { xs: 1, sm: 2 },
              pt: 1.5,
              pb: 0.5,
              minHeight: { xs: '3.2em', sm: '2.8em' },
              fontSize: { xs: '0.9rem', sm: '0.95rem' },
              fontWeight: 500,
            }}
          >
            {index < GALLERY_CAP_KEYS.length ? t(GALLERY_CAP_KEYS[index]) : ''}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 1, flexWrap: 'wrap' }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            component="button"
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 18 : 8,
              height: 8,
              borderRadius: 99,
              border: 'none',
              cursor: 'pointer',
              bgcolor: i === index ? '#2dd4bf' : 'rgba(255,255,255,0.28)',
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
          aria-label={t('timelendr.lightboxClose')}
          onClick={() => setLightboxOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 2, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
        {showImage ? (
          <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
            <Image
              src={current}
              alt={index < GALLERY_CAP_KEYS.length ? t(GALLERY_CAP_KEYS[index]) : title}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        ) : null}
        {index < GALLERY_CAP_KEYS.length ? (
          <Typography sx={{ px: 3, pb: 3, pt: 1, textAlign: 'center', opacity: 0.85 }}>
            {t(GALLERY_CAP_KEYS[index])}
          </Typography>
        ) : null}
      </Dialog>
    </Box>
  )
}
