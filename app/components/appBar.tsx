"use client";

import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
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

import './components.css';

export default function AppBarComponent() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const open = Boolean(anchorEl);
	const router = useRouter();
	const pathname = usePathname();
	

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (action: string) => {
		switch(action) {
		case 'Accueil':
			router.push('/');
			break;
		case 'Projets':
			router.push('/projets');
			break;
		case 'À propos':
			router.push('/a-propos');
			break;
		case 'Contact':
			router.push('/contact');
			break;
		case 'Admin':
			router.push('/admin');
			break;
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
					background: (theme) => theme.palette.mode === 'dark'
						? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
						: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
					boxShadow: (theme) => theme.palette.mode === 'dark'
						? '0 4px 20px rgba(0,0,0,0.3)'
						: '0 4px 20px rgba(30, 58, 138, 0.1)',
					borderBottom: (theme) => theme.palette.mode === 'dark'
						? '1px solid rgba(59, 130, 246, 0.2)'
						: '1px solid rgba(30, 58, 138, 0.1)',
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
						Portfolio
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
								Projets
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
								À propos
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
								Contact
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
					
					{/* Boutons de contrôle */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						{/* Bouton CV - Desktop seulement */}
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<CTAButton
								variant="outline"
								size="small"
								onClick={() => {
									// TODO: Ajouter le lien vers le CV
									window.open('/cv.pdf', '_blank')
								}}
								startIcon={<DescriptionIcon />}
							>
								CV
							</CTAButton>
						</Box>
						<IconButton
							color="inherit"
							aria-label="menu"
							onClick={handleMenuClick}
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
						>
							<MenuIcon />
						</IconButton>
						<ThemeSelector />
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
								background: (theme) => theme.palette.mode === 'dark'
									? 'linear-gradient(145deg, #1e293b 0%, #334155 100%)'
									: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
								border: (theme) => theme.palette.mode === 'dark'
									? '1px solid rgba(59, 130, 246, 0.2)'
									: '1px solid rgba(30, 58, 138, 0.1)',
								borderRadius: DESIGN_TOKENS.borderRadius.small,
								boxShadow: (theme) => theme.palette.mode === 'dark'
									? DESIGN_TOKENS.shadows.elevated.dark
									: DESIGN_TOKENS.shadows.elevated.light,
								mt: 1,
								minWidth: 180,
							}
						}}
					>
						<MenuItem 
							onClick={() => {
								window.open('/cv.pdf', '_blank')
								handleMenuClose()
							}}
							sx={{ gap: 1 }}
						>
							<DescriptionIcon fontSize="small" />
							Télécharger CV
						</MenuItem>
						<MenuItem onClick={handleAdminClick}>Admin</MenuItem>
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
