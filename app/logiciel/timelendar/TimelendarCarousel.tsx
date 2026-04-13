'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { getCardSurfaceSx, getProjectImageLetterboxGlassSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

const GALLERY_CAP_KEYS = [
  'timelendar.galleryCap1',
  'timelendar.galleryCap2',
  'timelendar.galleryCap3',
  'timelendar.galleryCap4',
  'timelendar.galleryCap5',
  'timelendar.galleryCap6',
  'timelendar.galleryCap7',
  'timelendar.galleryCap8',
] as const

type Props = {
  title: string
  emptyMessage: string
}

export default function TimelendarCarousel({ title, emptyMessage }: Props) {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const [slides, setSlides] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/img/timelendar/gallery.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return
        const urls = data
          .filter((f: unknown) => typeof f === 'string' && f.endsWith('.png'))
          .map((f: string) => `/img/timelendar/${f.replace(/^\/+/, '')}`)
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

  const go = useCallback(
    (dir: -1 | 1) => {
      if (slides.length === 0) return
      setIndex((i) => (i + dir + slides.length) % slides.length)
    },
    [slides.length]
  )

  const surface = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flat',
    level: 'soft',
    interactive: false,
  })

  if (slides.length === 0) {
    return (
      <Box
        sx={{
          ...surface,
          borderRadius: DESIGN_TOKENS.borderRadius.large,
          p: { xs: 3, sm: 4 },
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: textColor, mb: 2 }}>
          {title}
        </Typography>
        <Typography sx={{ color: textColor, opacity: 0.85, lineHeight: 1.7, maxWidth: 520, mx: 'auto' }}>
          {emptyMessage}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        ...surface,
        borderRadius: DESIGN_TOKENS.borderRadius.large,
        p: { xs: 2, sm: 2.5 },
        mb: 4,
        overflow: 'hidden',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, color: textColor, mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <Box
        onClick={() => failedSrc !== slides[index] && setLightboxOpen(true)}
        sx={{
          position: 'relative',
          borderRadius: DESIGN_TOKENS.borderRadius.medium,
          overflow: 'hidden',
          ...getProjectImageLetterboxGlassSx(theme.palette.mode),
          border: `1px solid ${primary}35`,
          aspectRatio: { xs: '4/3', sm: '16/10' },
          maxHeight: { sm: 520 },
          mx: 'auto',
          cursor: failedSrc !== slides[index] ? 'zoom-in' : 'default',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slides[index]}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {failedSrc !== slides[index] ? (
              <Image
                src={slides[index]}
                alt={index < GALLERY_CAP_KEYS.length ? t(GALLERY_CAP_KEYS[index]) : title}
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                style={{ objectFit: 'contain' }}
                priority={index === 0}
                onError={() => setFailedSrc(slides[index])}
              />
            ) : (
              <Typography sx={{ color: textColor, opacity: 0.7, p: 2 }}>{emptyMessage}</Typography>
            )}
          </motion.div>
        </AnimatePresence>
        <IconButton
          aria-label="Précédent"
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.45)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          aria-label="Suivant"
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.45)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={`cap-${index}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <Typography
            component="p"
            sx={{
              textAlign: 'center',
              color: textColor,
              opacity: 0.92,
              lineHeight: 1.6,
              px: { xs: 1, sm: 2 },
              pt: 2,
              pb: 0.5,
              minHeight: { xs: '3.2em', sm: '2.8em' },
              fontSize: { xs: '0.98rem', sm: '1.03rem' },
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
            onClick={() => setIndex(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIndex(i)}
            sx={{
              width: i === index ? 28 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === index ? primary : `${primary}40`,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              '&:hover': { bgcolor: i === index ? primary : `${primary}70` },
            }}
          />
        ))}
      </Box>

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth={false}
        fullWidth
        slotProps={{
          backdrop: { sx: { bgcolor: 'rgba(0,0,0,0.88)' } },
        }}
        PaperProps={{
          sx: {
            m: 0,
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: '100%',
            height: '100%',
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden',
            borderRadius: 0,
          },
        }}
      >
        <IconButton
          aria-label={t('timelendar.lightboxClose')}
          onClick={() => setLightboxOpen(false)}
          sx={{
            position: 'fixed',
            top: 12,
            right: 12,
            zIndex: 2,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          onClick={() => setLightboxOpen(false)}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, sm: 4 },
            pt: 6,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[index]}
            alt={index < GALLERY_CAP_KEYS.length ? t(GALLERY_CAP_KEYS[index]) : title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'min(96vw, 1400px)',
              maxHeight: 'min(85vh, 900px)',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 8,
              boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
            }}
          />
          {index < GALLERY_CAP_KEYS.length && (
            <Typography
              sx={{
                mt: 2,
                color: 'rgba(255,255,255,0.92)',
                textAlign: 'center',
                maxWidth: 640,
                lineHeight: 1.5,
                fontSize: '1.03rem',
              }}
            >
              {t(GALLERY_CAP_KEYS[index])}
            </Typography>
          )}
          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            {t('timelendar.lightboxHint')}
          </Typography>
        </Box>
      </Dialog>
    </Box>
  )
}
