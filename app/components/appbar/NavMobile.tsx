'use client'

import ContactMailIcon from '@mui/icons-material/ContactMail'
import ComputerIcon from '@mui/icons-material/Computer'
import HomeIcon from '@mui/icons-material/Home'
import AppsIcon from '@mui/icons-material/Apps'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import React from 'react'
import { NavRoute, NavRouteId } from '@/config/navRoutes'
import { SITE_DARK } from '@/design-system/siteDark'

type NavAppearance = 'legacy' | 'darkGlass'

interface NavMobileProps {
  routes: NavRoute[]
  pathname: string
  onNavigate: (path: string) => void
  appearance?: NavAppearance
}

function renderIcon(id: NavRouteId) {
  switch (id) {
    case 'home':
      return <HomeIcon />
    case 'projects':
      return <WorkIcon />
    case 'software':
      return <AppsIcon />
    case 'about':
      return <PersonIcon />
    case 'contact':
      return <ContactMailIcon />
    case 'support':
      return <ComputerIcon />
  }
}

export default function NavMobile({ routes, pathname, onNavigate, appearance = 'legacy' }: NavMobileProps) {
  const darkGlass = appearance === 'darkGlass'
  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        gap: 0.25,
        flexGrow: 1,
        minWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {routes.map((route) => {
        const active = route.isActive(pathname)
        return (
          <Link key={route.id} href={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
              color="inherit"
              component="span"
              aria-label={route.ariaLabel}
              sx={{
                color: darkGlass
                  ? active
                    ? SITE_DARK.text
                    : SITE_DARK.textSecondary
                  : active
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: darkGlass
                  ? active
                    ? SITE_DARK.surface
                    : 'transparent'
                  : active
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'transparent',
                minWidth: 44,
                minHeight: 44,
                padding: 0.75,
                flexShrink: 0,
                '&:hover': {
                  color: darkGlass ? SITE_DARK.text : 'white',
                  backgroundColor: darkGlass ? SITE_DARK.surfaceHover : 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              {renderIcon(route.id)}
            </IconButton>
          </Link>
        )
      })}
    </Box>
  )
}

