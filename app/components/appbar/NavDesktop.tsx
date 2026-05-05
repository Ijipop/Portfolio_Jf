'use client'

import ContactMailIcon from '@mui/icons-material/ContactMail'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { NavRoute, NavRouteId } from '@/config/navRoutes'

interface NavDesktopProps {
  routes: NavRoute[]
  pathname: string
  onNavigate: (path: string) => void
  t: (key: string) => string
}

function renderIcon(id: NavRouteId) {
  switch (id) {
    case 'home':
      return <HomeIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 22, lg: 21 } }} />
    case 'projects':
      return <WorkIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 22, lg: 21 } }} />
    case 'about':
      return <PersonIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 22, lg: 21 } }} />
    case 'contact':
      return <ContactMailIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 22, lg: 21 } }} />
  }
}

export default function NavDesktop({ routes, pathname, onNavigate, t }: NavDesktopProps) {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        gap: { xs: 0.5, sm: 1 },
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {routes.map((route) => {
        const active = route.isActive(pathname)
        return (
          <Link key={route.id} href={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
              color="inherit"
              component="span"
              sx={{
              color: active ? 'white' : 'rgba(255, 255, 255, 0.8)',
              backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              borderRadius: DESIGN_TOKENS.borderRadius.small,
              px: { xs: 1, sm: 1.75, lg: 1.5 },
              py: { xs: 1, sm: 0.85, lg: 0.65 },
              position: 'relative',
              transition: DESIGN_TOKENS.transitions.normal,
              ...(active && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '3px',
                  background: 'white',
                  borderRadius: '2px 2px 0 0',
                },
              }),
              '&:hover': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)',
              },
            }}
            >
              {renderIcon(route.id)}
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: active ? 600 : 400,
                  fontSize: { sm: '0.8125rem', lg: '0.78rem' },
                }}
              >
                {t(route.labelKey)}
              </Typography>
            </IconButton>
          </Link>
        )
      })}
    </Box>
  )
}

