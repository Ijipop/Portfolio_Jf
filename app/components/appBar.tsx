"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { memo, useLayoutEffect, useRef, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ThemeSelector } from '@/components/ThemeSelector';
import { PresentationModeToggle } from '@/components/PresentationModeToggle';
import { usePresentationMode } from '@/contexts/PresentationModeContext';
import { PRESENTATION_DEV_MODE_ENABLED } from '@/utils/vantaFeatures';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBeigeDark } from '@/hooks/useBeigeDark';
import { setBeigeDark } from '@/utils/beigeDarkModeStore';
import Button from '@mui/material/Button';
import NavDesktop from '@/components/appbar/NavDesktop';
import NavMobile from '@/components/appbar/NavMobile';
import { NAV_ROUTES } from '@/config/navRoutes';
import { SITE_DARK } from '@/design-system/siteDark';
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome';
import { isTimelendrRoute } from '@/utils/isTimelendrRoute';

import './components.css';

function AppBarComponent() {
	const router = useRouter();
	const pathname = usePathname();
	const { primary, secondary } = useThemeColors();
	const { locale, setLocale, t } = useLanguage();
	const { mode: presentationMode } = usePresentationMode();
	const { beigeDark } = useBeigeDark();
	const siteDarkChrome = useSiteDarkChrome();
	const isTimelendr = isTimelendrRoute(pathname);
	const useLegacyBar =
		isTimelendr ||
		(PRESENTATION_DEV_MODE_ENABLED && presentationMode === 'dev') ||
		(presentationMode === 'beige' && !beigeDark);
	const [scrolled, setScrolled] = useState(false);
	const appBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (useLegacyBar) return;
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [useLegacyBar]);

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
					...(useLegacyBar
						? {
								background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important`,
								backdropFilter: 'blur(14px) saturate(1.05)',
								WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
								boxShadow: `0 4px 20px ${primary}40 !important`,
								borderBottom: `1px solid ${primary}30 !important`,
							}
						: {
								background: scrolled ? `${SITE_DARK.appBarGlass} !important` : 'transparent !important',
								backdropFilter: scrolled ? 'blur(12px)' : 'none',
								WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
								boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.35) !important' : 'none !important',
								borderBottom: scrolled ? `1px solid ${SITE_DARK.border} !important` : '1px solid transparent !important',
								transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
							}),
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
								mr: { xs: 0.75, sm: 2 },
								display: 'inline-flex',
								flexDirection: { xs: 'column', sm: 'row' },
								alignItems: { xs: 'flex-start', sm: 'baseline' },
								gap: { xs: 0, sm: 0.5 },
								flexShrink: 0,
								lineHeight: { xs: 1.05, sm: 1.2 },
								cursor: 'pointer',
								userSelect: 'none',
								fontWeight: 800,
								letterSpacing: '-0.02em',
								'&:hover': { opacity: 0.9 },
							}}
						>
							<Box
								component="span"
								sx={{
									fontSize: { xs: '0.95rem', sm: '1.2rem' },
									whiteSpace: 'nowrap',
									...(siteDarkChrome && {
										backgroundImage: 'linear-gradient(165deg, #fdba74 14%, #ea580c 62%, #b91c1c 100%)',
										WebkitBackgroundClip: 'text',
										backgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										color: 'transparent',
									}),
								}}
							>
								{t('nav.portfolio')}
							</Box>
							<Box
								component="span"
								sx={{
									fontWeight: 600,
									fontSize: { xs: '0.62rem', sm: '0.88em' },
									opacity: 0.92,
									letterSpacing: { xs: '0.08em', sm: '0.01em' },
									textTransform: 'lowercase',
									whiteSpace: 'nowrap',
									mt: { xs: '-1px', sm: 0 },
									pl: { xs: '1px', sm: 0 },
								}}
							>
								{t('nav.portfolioSolutions')}
							</Box>
						</Typography>
					</Link>
					<NavDesktop routes={NAV_ROUTES} pathname={pathname} onNavigate={handleNavigate} t={t} appearance={siteDarkChrome ? 'darkGlass' : 'legacy'} />
					<NavMobile routes={NAV_ROUTES} pathname={pathname} onNavigate={handleNavigate} appearance={siteDarkChrome ? 'darkGlass' : 'legacy'} />
					
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
								color: siteDarkChrome ? SITE_DARK.textSecondary : 'white',
								fontWeight: 700,
								border: siteDarkChrome ? `1px solid ${SITE_DARK.border}` : '1px solid rgba(255,255,255,0.8)',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								'&:hover': {
									color: siteDarkChrome ? SITE_DARK.text : 'white',
									bgcolor: siteDarkChrome ? SITE_DARK.surfaceHover : 'rgba(255,255,255,0.15)',
								},
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
									color: siteDarkChrome ? SITE_DARK.textSecondary : 'white',
									border: siteDarkChrome ? `1px solid ${SITE_DARK.border}` : '1px solid rgba(255,255,255,0.75)',
									borderRadius: '50%',
									background: siteDarkChrome
										? SITE_DARK.surface
										: beigeDark
											? 'linear-gradient(135deg, rgba(255,107,53,0.55), rgba(255,23,68,0.5))'
											: 'rgba(255,255,255,0.08)',
									transition: 'none',
									'&:hover': {
										background: siteDarkChrome
											? SITE_DARK.surfaceHover
											: beigeDark
												? 'linear-gradient(135deg, rgba(255,107,53,0.72), rgba(255,23,68,0.62))'
												: 'rgba(255,255,255,0.16)',
										borderColor: siteDarkChrome ? SITE_DARK.borderHover : 'rgba(255,255,255,0.9)',
										color: siteDarkChrome ? SITE_DARK.text : 'white',
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
						{PRESENTATION_DEV_MODE_ENABLED && (
							<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
								<PresentationModeToggle />
							</Box>
						)}
						{PRESENTATION_DEV_MODE_ENABLED && presentationMode === 'dev' && (
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
