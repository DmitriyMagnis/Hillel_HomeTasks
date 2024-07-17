import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  Avatar,
  Button,
  type SxProps,
  IconButton,
} from '@mui/material';
import { useState, type PropsWithChildren } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const linkStyles: SxProps = {
  color: 'primary.contrastText',
  '&:hover': {
    color: 'white',
  },
  '&.active': {
    color: 'white',
  },
};

const navList = [
  { to: '/', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/interests', label: 'Interests' },
];

const BasicLayout = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          display: {
            md: 'none',
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ color: 'white', ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        // variant="persistent"
        onClose={handleDrawerClose}
        anchor={open ? 'bottom' : 'left'}
        sx={{
          display: {
            xs: open ? 'block' : 'none',
            md: 'block',
          },

          width: open ? '100%' : 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? '100%' : 300,
            height: open ? 300 : 'inherit',
            bgcolor: 'primary.main',
            boxSizing: 'border-box',
          },
        }}
        variant={open ? undefined : 'permanent'}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: open ? 300 : '100vh',
            display: 'flex',
            flexDirection: open ? 'row' : 'column',

            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt="Proger avatar"
            src="avatar.png"
            sx={{
              width: 156,
              height: 156,
              outlineWidth: 7,
              outlineStyle: 'solid',
              outlineColor: 'primary.200',
              mb: 2,
            }}
          />
          <Box>
            {navList.map(({ to, label }) => (
              <Button
                key={label}
                fullWidth
                variant="text"
                component={NavLink}
                to={to}
                sx={linkStyles}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          p: '3rem',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BasicLayout;
