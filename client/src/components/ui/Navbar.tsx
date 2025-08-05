import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuthStore } from '../../store/authStore';
import { useBoardStore } from '../../store/boardStore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

function NavBarTest() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  // Board store for stats
  const boards = useBoardStore((state) => state.boards);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);

  // Fetch boards when component mounts to get count
  useEffect(() => {
    if (isAuthenticated) {
      fetchBoards();
    }
  }, [isAuthenticated, fetchBoards]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    handleCloseUserMenu();
    try {
      logout();
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleUserMenuAction = (action: string) => {
    handleCloseUserMenu();
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'workspace':
        navigate('/workspace');
        break;
      case 'boards':
        navigate('/boards');
        break;
      default:
        break;
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    const username = user.username || '';
    const email = user.email || '';

    if (username) {
      return username.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        bgcolor: 'primary.main',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.30)',
        zIndex: (theme) => theme.zIndex.drawer + 1, 
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Logo - Clickable to go to workspace */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <AdbIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component={RouterLink}
              to='/workspace'
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Kōbu
            </Typography>
          </Box>

          {/* User Menu */}
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open menu'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      width: 40,
                      height: 40,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    {getUserInitials()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 220,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                  },
                }}
              >
                {/* User Info Header */}
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                    {user?.username || 'User'}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ fontSize: '0.75rem' }}
                  >
                    {user?.email}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {boards.length} board{boards.length !== 1 ? 's' : ''}{' '}
                    created
                  </Typography>
                </Box>

                {/* Workspace */}
                <MenuItem
                  onClick={() => handleUserMenuAction('workspace')}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AdbIcon sx={{ fontSize: 18 }} />
                    <Typography>Workspace</Typography>
                  </Box>
                </MenuItem>

                {/* Profile */}
                <MenuItem
                  onClick={() => handleUserMenuAction('profile')}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <User size={18} />
                    <Typography>Profile</Typography>
                  </Box>
                </MenuItem>

                {/* Divider */}
                <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} />

                {/* Logout */}
                <MenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  sx={{
                    py: 1.5,
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.lighter',
                    },
                    '&.Mui-disabled': {
                      opacity: 0.6,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LogOut size={18} />
                    <Typography>
                      {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            /* Auth Buttons for non-authenticated users */
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={RouterLink}
                to='/login'
                sx={{
                  color: 'inherit',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <Typography
                  variant='button'
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  Login
                </Typography>
              </IconButton>
              <IconButton
                component={RouterLink}
                to='/register'
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                <Typography
                  variant='button'
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  Sign Up
                </Typography>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarTest;
