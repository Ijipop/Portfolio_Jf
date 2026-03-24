"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { ThemeSelector } from '@/components/ThemeSelector';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@mui/material/Button';
import NavDesktop from '@/components/appbar/NavDesktop';
import NavMobile from '@/components/appbar/NavMobile';
import { NAV_ROUTES } from '@/config/navRoutes';

import './components.css';

export default function AppBarComponent() {
	const router = useRouter();
	const pathname = usePathname();
	const { primary, secondary } = useThemeColors();
	const { locale, setLocale, t } = useLanguage();

	const handleNavigate = (path: string) => router.push(path);

	return (
		<>
			<AppBar 
				position="static" 
				sx={{
					background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important`,
					boxShadow: `0 4px 20px ${primary}40 !important`,
					borderBottom: `1px solid ${primary}30 !important`,
				}}
			>
				<Toolbar sx={{ 
					display: 'flex', 
					alignItems: 'center',
					padding: { xs: '8px 4px', sm: 1, md: 2 },
					gap: { xs: 0.5, sm: 1, md: 2 },
					minHeight: { xs: '56px', sm: '64px' },
					minWidth: 0,
				}}>
					{/* Titre Portfolio : lien vers l'accueil (prefetch activé) */}
					<Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						<Typography
							variant="h6"
							component="span"
							sx={{
								mr: { xs: 1, sm: 2 },
								fontSize: { xs: '1rem', sm: '1.25rem' },
								display: { xs: 'none', sm: 'block' },
								cursor: 'pointer',
								userSelect: 'none',
								'&:hover': { opacity: 0.9 },
							}}
						>
							{t('nav.portfolio')}
						</Typography>
					</Link>
					<NavDesktop routes={NAV_ROUTES} pathname={pathname} onNavigate={handleNavigate} t={t} />
					<NavMobile routes={NAV_ROUTES} pathname={pathname} onNavigate={handleNavigate} />
					
					{/* Toggle langue + Thème + Menu (espacés et alignés) */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, ml: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
						<Button
							size="small"
							onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
							sx={{
								minWidth: 40,
								height: 40,
								fontSize: '0.75rem',
								px: 1,
								py: 0,
								color: 'white',
								fontWeight: 700,
								border: '1px solid rgba(255,255,255,0.8)',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								'&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.15)' },
							}}
						>
							{locale === 'fr' ? 'FR' : 'ENG'}
						</Button>
						<ThemeSelector />
					</Box>
				</Toolbar>
			</AppBar>
		</>
	)
}
