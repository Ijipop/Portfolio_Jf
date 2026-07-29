'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE_DARK } from '@/design-system/siteDark'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'

type IjipopDarkLoaderProps = {
  message?: string
}

/**
 * Loader marque pour fond sombre — arcs orange lumineux + wordmark ijipop.
 * Remplace les anciennes frames / vidéos trop sombres (illisibles sur site dark).
 */
export default function IjipopDarkLoader({ message = '' }: IjipopDarkLoaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={message.trim() || 'Chargement'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 2.5, sm: 3 },
        minHeight: { xs: 'min(52vh, 420px)', sm: '50vh' },
        px: { xs: 1.5, sm: 2 },
        width: '100%',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          width: { xs: 220, sm: 280 },
          height: { xs: 220, sm: 280 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${SITE_DARK.brandGlowStrong} 0%, transparent 68%)`,
          filter: 'blur(2px)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', width: { xs: 112, sm: 132 }, height: { xs: 112, sm: 132 } }}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }
          }
        >
          <Box
            component="svg"
            viewBox="0 0 120 120"
            sx={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="ijipopLoaderRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="35%" stopColor="#fdba74" />
                <stop offset="70%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <linearGradient id="ijipopLoaderArc" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="55%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
              <filter id="ijipopLoaderGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="rgba(251, 146, 60, 0.18)"
              strokeWidth="1.25"
              strokeDasharray="3 7"
            />

            <path
              d="M 78 28 A 34 34 0 1 1 42 92"
              fill="none"
              stroke="url(#ijipopLoaderRing)"
              strokeWidth="11"
              strokeLinecap="round"
              filter="url(#ijipopLoaderGlow)"
            />
            <path
              d="M 42 92 A 34 34 0 1 1 78 28"
              fill="none"
              stroke="url(#ijipopLoaderArc)"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.92"
              filter="url(#ijipopLoaderGlow)"
            />

            <circle cx="78" cy="28" r="5.5" fill="#ffedd5" filter="url(#ijipopLoaderGlow)" />
            <circle cx="42" cy="92" r="5.5" fill="#fdba74" filter="url(#ijipopLoaderGlow)" />
          </Box>
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            inset: '28%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,237,213,0.55) 0%, rgba(234,88,12,0.35) 45%, rgba(8,8,12,0.2) 100%)',
            border: '1px solid rgba(251, 146, 60, 0.35)',
            boxShadow: `0 0 28px ${SITE_DARK.brandGlowStrong}`,
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </Box>

      <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          component="div"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.04em',
            fontSize: { xs: '1.85rem', sm: '2.25rem' },
            lineHeight: 1,
            backgroundImage: BRAND_GLITCH_GRADIENT,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            filter: 'drop-shadow(0 0 18px rgba(234, 88, 12, 0.35))',
          }}
        >
          ijipop
        </Typography>
        <Typography
          component="div"
          sx={{
            mt: 0.75,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontSize: '0.68rem',
            color: SITE_DARK.textSecondary,
          }}
        >
          solutions
        </Typography>

        <Box
          aria-hidden
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 0.75,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                background: i === 1 ? '#ea580c' : '#fdba74',
                display: 'inline-block',
              }}
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: [0.35, 1, 0.35], y: [0, -3, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 1.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.18,
                    }
              }
            />
          ))}
        </Box>

        {message.trim() ? (
          <Typography
            sx={{
              mt: 2,
              color: SITE_DARK.textMuted,
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        ) : null}
      </Box>
    </Box>
  )
}
