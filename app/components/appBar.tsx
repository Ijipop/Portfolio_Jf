"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { memo, useLayoutEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ThemeSelector } from '@/components/ThemeSelector';
import { PresentationModeToggle } from '@/components/PresentationModeToggle';
import { usePresentationMode } from '@/contexts/PresentationModeContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBeigeDark } from '@/hooks/useBeigeDark';
import { setBeigeDark } from '@/utils/beigeDarkModeStore';
import Button from '@mui/material/Button';
import NavDesktop from '@/components/appbar/NavDesktop';
import NavMobile from '@/components/appbar/NavMobile';
import { NAV_ROUTES } from '@/config/navRoutes';

import './components.css';

function AppBarComponent() {
	const router = useRouter();
	const pathname = usePathname();
	const { primary, secondary } = useThemeColors();
	const { locale, setLocale, t } = useLanguage();
	const { mode: presentationMode } = usePresentationMode();
	const { beigeDark } = useBeigeDark();
	const appBarRef = useRef<HTMLDivElement>(null);

	const handleNavigate = (path: string) => router.push(path);

	useLayoutEffect(() => {
		const node = appBarRef.current;
		if (!node || typeof document === 'undefined') return;

		const syncAppBarHeight = () => {
			document.documentElement.style.setProperty('--app-bar-height', `${node.offsetHeight}px`);
		};

		syncAppBarHeight();
		window.addEventListener('resize', syncAppBarHeight);

		if (typeof ResizeObserver === 'undefined') {
			return () => {
				window.removeEventListener('resize', syncAppBarHeight);
			};
		}

		const observer = new ResizeObserver(syncAppBarHeight);
		observer.observe(node);

		return () => {
			observer.disconnect();
			window.removeEventListener('resize', syncAppBarHeight);
		};
	}, []);

	return (
		<>
			<AppBar 
				ref={appBarRef}
				position="sticky" 
				sx={{
					top: 0,
					zIndex: (theme) => theme.zIndex.appBar,
					background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important`,
					backdropFilter: 'blur(14px) saturate(1.05)',
					WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
					boxShadow: `0 4px 20px ${primary}40 !important`,
					borderBottom: `1px solid ${primary}30 !important`,
					flexShrink: 0,
					mb: 0,
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
					{/* Marque : lien vers l'accueil (prefetch activé) */}
					<Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						<Typography
							variant="h6"
							component="span"
							sx={{
								mr: { xs: 1, sm: 2 },
								fontSize: { xs: '1rem', sm: '1.25rem' },
								display: { xs: 'block', sm: 'block' },
								maxWidth: { xs: 72, sm: 'none' },
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
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
								minWidth: { xs: 36, sm: 40 },
								height: { xs: 36, sm: 40 },
								fontSize: '0.75rem',
								px: { xs: 0.75, sm: 1 },
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
						{presentationMode === 'beige' && (
							<IconButton
								size="small"
								onClick={() => setBeigeDark(!beigeDark)}
								aria-label={beigeDark ? t('nav.beigeDarkModeOff') : t('nav.beigeDarkModeOn')}
								title={beigeDark ? t('nav.beigeDarkModeOff') : t('nav.beigeDarkModeOn')}
								sx={{
									width: 40,
									height: 40,
									color: 'white',
									border: '1px solid rgba(255,255,255,0.75)',
									borderRadius: '50%',
									background: beigeDark
										? 'linear-gradient(135deg, rgba(255,107,53,0.55), rgba(255,23,68,0.5))'
										: 'rgba(255,255,255,0.08)',
									transition: 'none',
									'&:hover': {
										background: beigeDark
											? 'linear-gradient(135deg, rgba(255,107,53,0.72), rgba(255,23,68,0.62))'
											: 'rgba(255,255,255,0.16)',
										borderColor: 'rgba(255,255,255,0.9)',
									},
								}}
							>
								{beigeDark ? (
									<LightModeOutlinedIcon sx={{ fontSize: 20 }} />
								) : (
									<DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
								)}
							</IconButton>
						)}
						<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
							<PresentationModeToggle />
						</Box>
						{presentationMode === 'dev' && (
							<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
								<ThemeSelector />
							</Box>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default memo(AppBarComponent)
