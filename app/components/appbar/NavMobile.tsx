'use client'

import ContactMailIcon from '@mui/icons-material/ContactMail'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import React from 'react'
import { NavRoute, NavRouteId } from '@/config/navRoutes'

interface NavMobileProps {
  routes: NavRoute[]
  pathname: string
  onNavigate: (path: string) => void
}

function renderIcon(id: NavRouteId) {
  switch (id) {
    case 'home':
      return <HomeIcon />
    case 'projects':
      return <FolderOpenIcon />
    case 'about':
      return <PersonIcon />
    case 'contact':
      return <ContactMailIcon />
  }
}

export default function NavMobile({ routes, pathname, onNavigate }: NavMobileProps) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        gap: 0.5,
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
                color: active ? 'white' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                padding: 1,
                flexShrink: 0,
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
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

