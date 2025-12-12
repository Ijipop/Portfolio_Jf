'use client'

import { Box, CircularProgress, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { DESIGN_TOKENS } from '../../design-system/constants'

interface LoadingSpinnerProps {
  message?: string
  size?: number
}

export default function LoadingSpinner({ 
  message = 'Chargement...', 
  size = 60 
}: LoadingSpinnerProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 3
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress 
            size={size} 
            sx={{ 
              color: (theme) => theme.palette.mode === 'dark' ? '#4a90e2' : '#667eea',
              animationDuration: '1.5s',
            }} 
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <Box
                sx={{
                  width: size * 0.4,
                  height: size * 0.4,
                  borderRadius: '50%',
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #3b82f6 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)',
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 0 20px rgba(59, 130, 246, 0.5)'
                    : '0 0 20px rgba(30, 58, 138, 0.4)',
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{
            fontWeight: 500,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #ffffff 0%, #e0f2fe 50%, #ffffff 100%)'
              : 'linear-gradient(45deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease-in-out infinite',
          }}
        >
          {message}
        </Typography>
      </motion.div>
    </Box>
  )
}


