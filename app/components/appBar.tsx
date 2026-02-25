"use client";

import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CTAButton from './shared/CTAButton';
import { DESIGN_TOKENS } from '../design-system/constants';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import LoginModal from './LoginModal';
import { ThemeSelector } from './ThemeSelector';
import { useThemeColors } from '../hooks/useThemeColors';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '@mui/material/Button';

import './components.css';

export default function AppBarComponent() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const open = Boolean(anchorEl);
	const router = useRouter();
	const pathname = usePathname();
	const { primary, secondary } = useThemeColors();
	const { locale, setLocale, t } = useLanguage();

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (routeId: 'home' | 'projects' | 'about' | 'contact' | 'admin') => {
		switch (routeId) {
			case 'home': router.push('/'); break;
			case 'projects': router.push('/projets'); break;
			case 'about': router.push('/a-propos'); break;
			case 'contact': router.push('/contact'); break;
			case 'admin': router.push('/admin'); break;
		}
		handleMenuClose();
	};
	
	const handleAdminClick = () =>
	{
		handleMenuClose();
		setLoginModalOpen(true);
	};

	const handleHomeClick = () => {
		router.push('/');
	};
	

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
					minHeight: { xs: '56px', sm: '64px' }
				}}>
					{/* Bouton Accueil */}
					<IconButton 
						edge="start" 
						color="inherit" 
						aria-label="accueil"
						onClick={handleHomeClick}
						sx={{ mr: 1 }}
					>
						<HomeIcon />
					</IconButton>
					
					{/* Titre Portfolio */}
					<Typography 
						variant="h6" 
						component="div" 
						sx={{ 
							mr: { xs: 1, sm: 2 },
							fontSize: { xs: '1rem', sm: '1.25rem' },
							display: { xs: 'none', sm: 'block' }
						}}
					>
						{t('nav.portfolio')}
					</Typography>
					
					{/* Onglets de navigation - Desktop */}
					<Box sx={{ 
						display: { xs: 'none', sm: 'flex' }, 
						gap: { xs: 0.5, sm: 1 },
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<IconButton
							color="inherit"
							onClick={() => router.push('/projets')}
							sx={{
								color: pathname === '/projets' ? 'white' : 'rgba(255, 255, 255, 0.8)',
								backgroundColor: pathname === '/projets' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
								borderRadius: DESIGN_TOKENS.borderRadius.small,
								px: { xs: 1, sm: 2 },
								py: 1,
								position: 'relative',
								transition: DESIGN_TOKENS.transitions.normal,
								...(pathname === '/projets' && {
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
									}
								}),
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.15)',
									transform: 'translateY(-2px)',
								},
							}}
						>
							<WorkIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 24 } }} />
							<Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: pathname === '/projets' ? 600 : 400 }}>
								{t('nav.projects')}
							</Typography>
						</IconButton>
						
						<IconButton
							color="inherit"
							onClick={() => router.push('/a-propos')}
							sx={{
								color: pathname === '/a-propos' ? 'white' : 'rgba(255, 255, 255, 0.8)',
								backgroundColor: pathname === '/a-propos' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
								borderRadius: DESIGN_TOKENS.borderRadius.small,
								px: { xs: 1, sm: 2 },
								py: 1,
								position: 'relative',
								transition: DESIGN_TOKENS.transitions.normal,
								...(pathname === '/a-propos' && {
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
									}
								}),
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.15)',
									transform: 'translateY(-2px)',
								},
							}}
						>
							<PersonIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 24 } }} />
							<Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: pathname === '/a-propos' ? 600 : 400 }}>
								{t('nav.about')}
							</Typography>
						</IconButton>
						
						<IconButton
							color="inherit"
							onClick={() => router.push('/contact')}
							sx={{
								color: pathname === '/contact' ? 'white' : 'rgba(255, 255, 255, 0.8)',
								backgroundColor: pathname === '/contact' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
								borderRadius: DESIGN_TOKENS.borderRadius.small,
								px: { xs: 1, sm: 2 },
								py: 1,
								position: 'relative',
								transition: DESIGN_TOKENS.transitions.normal,
								...(pathname === '/contact' && {
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
									}
								}),
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.15)',
									transform: 'translateY(-2px)',
								},
							}}
						>
							<ContactMailIcon sx={{ mr: { xs: 0, sm: 1 }, fontSize: { xs: 20, sm: 24 } }} />
							<Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: pathname === '/contact' ? 600 : 400 }}>
								{t('nav.contact')}
							</Typography>
						</IconButton>
					</Box>

					{/* Icônes de navigation - Mobile uniquement */}
					<Box sx={{ 
						display: { xs: 'flex', sm: 'none' }, 
						gap: 0.5,
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<IconButton
							color="inherit"
							onClick={() => router.push('/projets')}
							aria-label="projets"
							sx={{
								color: pathname === '/projets' ? 'white' : 'rgba(255, 255, 255, 0.7)',
								backgroundColor: pathname === '/projets' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
								padding: '8px',
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.15)',
								},
							}}
						>
							<WorkIcon />
						</IconButton>
						
						<IconButton
							color="inherit"
							onClick={() => router.push('/a-propos')}
							aria-label="à propos"
							sx={{
								color: pathname === '/a-propos' ? 'white' : 'rgba(255, 255, 255, 0.7)',
								backgroundColor: pathname === '/a-propos' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
								padding: '8px',
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.15)',
								},
							}}
						>
							<PersonIcon />
						</IconButton>
						
						<IconButton
							color="inherit"
							onClick={() => router.push('/contact')}
							aria-label="contact"
							sx={{
								color: pathname === '/contact' ? 'white' : 'rgba(255, 255, 255, 0.7)',
								backgroundColor: pathname === '/contact' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
								padding: '8px',
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.15)',
								},
							}}
						>
							<ContactMailIcon />
						</IconButton>
					</Box>
					
					{/* Toggle langue + Thème + Menu (espacés et alignés) */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, ml: { xs: 0.5, sm: 1 } }}>
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
						<IconButton
							color="inherit"
							aria-label="menu"
							onClick={handleMenuClick}
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							sx={{ padding: 1, width: 40, height: 40 }}
						>
							<MenuIcon />
						</IconButton>
					</Box>
					
					{/* Menu déroulant pour admin */}
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
						disableEnforceFocus
						disableAutoFocus
						disableRestoreFocus
						sx={{
							'& .MuiPaper-root': {
								background: `linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%) !important`,
								border: `1px solid ${primary}30 !important`,
								borderRadius: DESIGN_TOKENS.borderRadius.small,
								boxShadow: `0 8px 32px ${primary}20 !important`,
								mt: 1,
								minWidth: 180,
							}
						}}
					>
						<MenuItem onClick={handleAdminClick}>{t('nav.admin')}</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<LoginModal 
				open={loginModalOpen} 
				onClose={() => setLoginModalOpen(false)} 
			/>
		</>
	)
}
