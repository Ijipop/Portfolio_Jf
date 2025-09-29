"use client";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import LoginModal from './LoginModal';

import './components.css';

export default function AppBarComponent() {
	const { isDarkMode, toggleTheme } = useTheme();
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
					padding: { xs: 1, md: 2 },
					gap: { xs: 1, md: 2 }
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
					<Typography variant="h6" component="div" sx={{ mr: 2 }}>
						Portfolio
					</Typography>
					
					{/* Onglets de navigation */}
					<Box sx={{ 
						display: 'flex', 
						gap: 1,
						flexGrow: 1,
						justifyContent: 'center'
					}}>
						<IconButton
							color="inherit"
							onClick={() => router.push('/projets')}
							sx={{
								color: pathname === '/projets' ? 'white' : 'rgba(255, 255, 255, 0.7)',
								backgroundColor: pathname === '/projets' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
								borderRadius: 2,
								px: 2,
								py: 1,
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.1)',
								},
							}}
						>
							<WorkIcon sx={{ mr: 1 }} />
							<Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
								Projets
							</Typography>
						</IconButton>
						
						<IconButton
							color="inherit"
							onClick={() => router.push('/a-propos')}
							sx={{
								color: pathname === '/a-propos' ? 'white' : 'rgba(255, 255, 255, 0.7)',
								backgroundColor: pathname === '/a-propos' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
								borderRadius: 2,
								px: 2,
								py: 1,
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.1)',
								},
							}}
						>
							<PersonIcon sx={{ mr: 1 }} />
							<Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
								À propos
							</Typography>
						</IconButton>
						
						<IconButton
							color="inherit"
							onClick={() => router.push('/contact')}
							sx={{
								color: pathname === '/contact' ? 'white' : 'rgba(255, 255, 255, 0.7)',
								backgroundColor: pathname === '/contact' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
								borderRadius: 2,
								px: 2,
								py: 1,
								'&:hover': {
									color: 'white',
									backgroundColor: 'rgba(255, 255, 255, 0.1)',
								},
							}}
						>
							<ContactMailIcon sx={{ mr: 1 }} />
							<Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
								Contact
							</Typography>
						</IconButton>
					</Box>
					
					{/* Boutons de contrôle */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
						<IconButton 
							color="inherit" 
							aria-label="dark mode toggle" 
							onClick={toggleTheme}
						> 
							{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
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
						sx={{
							'& .MuiPaper-root': {
								background: (theme) => theme.palette.mode === 'dark'
									? 'linear-gradient(145deg, #1e293b 0%, #334155 100%)'
									: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
								border: (theme) => theme.palette.mode === 'dark'
									? '1px solid rgba(59, 130, 246, 0.2)'
									: '1px solid rgba(30, 58, 138, 0.1)',
								borderRadius: 3,
								boxShadow: (theme) => theme.palette.mode === 'dark'
									? '0 10px 40px rgba(0,0,0,0.4)'
									: '0 10px 40px rgba(30, 58, 138, 0.1)',
								mt: 1,
							}
						}}
					>
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
