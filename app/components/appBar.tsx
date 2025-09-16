"use client";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import LoginModal from './LoginModal';

import './components.css';

export default function AppBarComponent() {
	const { isDarkMode, toggleTheme } = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const open = Boolean(anchorEl);
	const router = useRouter();

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
				<Toolbar>
					<IconButton 
						edge="start" 
						color="inherit" 
						aria-label="accueil"
						onClick={handleHomeClick}
						sx={{ mr: 1 }}
					>
						<HomeIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Portfolio
					</Typography>
					<IconButton 
						edge="start" 
						color="inherit" 
						aria-label="menu"
						onClick={handleMenuClick}
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<MenuIcon />
					</IconButton>
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
						<MenuItem onClick={() => handleMenuItemClick('Accueil')}>Accueil</MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('Projets')}>Projets</MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('À propos')}>À propos</MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('Contact')}>Contact</MenuItem>
						<MenuItem onClick={handleAdminClick}>Admin</MenuItem>
					</Menu>
					<IconButton 
						edge="end" 
						color="inherit" 
						aria-label="dark mode toggle" 
						onClick={toggleTheme}
					> 
						{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<LoginModal 
				open={loginModalOpen} 
				onClose={() => setLoginModalOpen(false)} 
			/>
		</>
	)
}
