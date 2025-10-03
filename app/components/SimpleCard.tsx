'use client'

import { Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

const SimpleCard = styled(Card)(({ theme, customTheme }: any) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #f0f4ff 0%, #e6f2ff 50%, #dbeafe 100%)',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.2)' 
    : '1px solid rgba(74, 85, 104, 0.15)',
  borderRadius: 24,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(74, 85, 104, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 8px 32px rgba(74, 85, 104, 0.1), 0 0 0 1px rgba(74, 85, 104, 0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  zIndex: 1,
  height: '400px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${customTheme?.primary || '#ff6b35'}20 0%, ${customTheme?.secondary || '#ff1744'}20 25%, ${customTheme?.accent || '#3b82f6'}20 50%, ${customTheme?.primary || '#ff6b35'}20 75%, ${customTheme?.primary || '#ff6b35'}20 100%)`
      : `linear-gradient(135deg, ${customTheme?.primary || '#3b82f6'}20 0%, ${customTheme?.secondary || '#059669'}20 25%, ${customTheme?.accent || '#8b5cf6'}20 50%, ${customTheme?.primary || '#3b82f6'}20 75%, ${customTheme?.primary || '#3b82f6'}20 100%)`,
    backgroundSize: '200% 200%',
    opacity: 0,
    transition: 'all 0.4s ease',
    zIndex: 1,
    animation: 'gradientShift 3s ease-in-out infinite',
  },
  '&:hover': {
    transform: 'translateY(-16px) scale(1.02)',
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%), linear-gradient(135deg, ${customTheme?.primary || '#ff6b35'}30 0%, ${customTheme?.secondary || '#ff1744'}30 25%, ${customTheme?.accent || '#3b82f6'}30 50%, ${customTheme?.primary || '#ff6b35'}30 75%, ${customTheme?.primary || '#ff6b35'}30 100%)`
      : `linear-gradient(145deg, #f0f4ff 0%, #e6f2ff 50%, #dbeafe 100%), linear-gradient(135deg, ${customTheme?.primary || '#3b82f6'}30 0%, ${customTheme?.secondary || '#059669'}30 25%, ${customTheme?.accent || '#8b5cf6'}30 50%, ${customTheme?.primary || '#3b82f6'}30 75%, ${customTheme?.primary || '#3b82f6'}30 100%)`,
    boxShadow: theme.palette.mode === 'dark'
      ? `0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 2px ${customTheme?.primary || '#ff6b35'}60, 0 0 30px ${customTheme?.primary || '#ff6b35'}40, 0 0 60px ${customTheme?.secondary || '#ff1744'}20, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
      : `0 25px 50px ${customTheme?.primary || '#3b82f6'}20, 0 0 0 2px ${customTheme?.primary || '#3b82f6'}60, 0 0 30px ${customTheme?.primary || '#3b82f6'}40, 0 0 60px ${customTheme?.secondary || '#059669'}20, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
    '&::before': {
      opacity: 1,
      background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, ${customTheme?.primary || '#ff6b35'}40 0%, ${customTheme?.secondary || '#ff1744'}40 25%, ${customTheme?.accent || '#3b82f6'}40 50%, ${customTheme?.primary || '#ff6b35'}40 75%, ${customTheme?.primary || '#ff6b35'}40 100%)`
        : `linear-gradient(135deg, ${customTheme?.primary || '#3b82f6'}40 0%, ${customTheme?.secondary || '#059669'}40 25%, ${customTheme?.accent || '#8b5cf6'}40 50%, ${customTheme?.primary || '#3b82f6'}40 75%, ${customTheme?.primary || '#3b82f6'}40 100%)`,
    }
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
}))

interface SimpleCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function SimpleCardComponent({ children, onClick, className }: SimpleCardProps) {
  const { customTheme } = useAdvancedTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <SimpleCard onClick={onClick} className={className} customTheme={customTheme}>
        <CardContent sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
          {children}
        </CardContent>
      </SimpleCard>
    </motion.div>
  )
}
