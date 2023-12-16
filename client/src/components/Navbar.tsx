// Navbar.tsx
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const loginOptions = ['As user', 'As advocate'];
const authOptions = ['As user', 'As advocate'];

function ResponsiveAppBar() {
    const [anchorElLogin, setAnchorElLogin] = React.useState<null | HTMLElement>(null);
    const [anchorElAuth, setAnchorElAuth] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenLoginMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLogin(event.currentTarget);
    };

    const handleOpenAuthMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAuth(event.currentTarget);
    };

    const handleCloseLoginMenu = () => {
        setAnchorElLogin(null);
    };

    const handleCloseAuthMenu = () => {
        setAnchorElAuth(null);
    };

    const handleMenuItemClick = (route: string) => {
        let login_route = route === 'As user' ? '/user-login' : '/advo-login';
        navigate(login_route);
        handleCloseAuthMenu();
    };

    const handleRegisterMenuItemClick = (option: string) => {
        const route = option === 'As user' ? '/user-register' : '/advo-register';
        navigate(route);
        handleCloseAuthMenu();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        onClick={handleOpenLoginMenu}
                        sx={{
                            borderRadius: '10px',
                            marginLeft: '10px',
                            color: 'white',
                            backgroundColor: 'black',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: '#FF9933', // Change to orange on hover
                            },
                        }}
                    >
                        Login
                    </Button>
                    <Menu
                        id="login-menu-appbar"
                        anchorEl={anchorElLogin}
                        anchorOrigin={{
                            vertical: 'bottom', // Adjust the vertical position
                            horizontal: 'left', // Adjust the horizontal position
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        open={Boolean(anchorElLogin)}
                        onClose={handleCloseLoginMenu}
                    >
                        {loginOptions.map((option) => (
                            <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
                                <Typography textAlign="center" color="black">
                                    {option}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    <Button
                        onClick={handleOpenAuthMenu}
                        sx={{
                            borderRadius: '10px',
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            color: 'white',
                            backgroundColor: 'black',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: 'green', // Change to green on hover
                            },
                        }}
                    >
                        Register
                    </Button>
                    <Menu
                        id="auth-menu-appbar"
                        anchorEl={anchorElAuth}
                        anchorOrigin={{
                            vertical: 'bottom', // Adjust the vertical position
                            horizontal: 'left', // Adjust the horizontal position
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        open={Boolean(anchorElAuth)}
                        onClose={handleCloseAuthMenu}
                    >
                        {authOptions.map((option) => (
                            <MenuItem key={option} onClick={() => handleRegisterMenuItemClick(option)}>
                                <Typography textAlign="center" color="black">
                                    {option}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
