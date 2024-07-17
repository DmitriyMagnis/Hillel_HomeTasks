import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Avatar,
  Button,
  type SxProps,
} from '@mui/material';
import type { PropsWithChildren } from 'react';

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

const BasicLayout = ({ children }: PropsWithChildren) => {
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
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          display: {
            sm: 'none',
            md: 'block',
          },

          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,

            bgcolor: 'primary.main',
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
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
          <Button
            fullWidth
            variant="text"
            component={NavLink}
            to="/"
            sx={linkStyles}
          >
            About
          </Button>
          <Button
            fullWidth
            variant="text"
            component={NavLink}
            to="/skills"
            sx={linkStyles}
          >
            Skills
          </Button>
          <Button
            fullWidth
            variant="text"
            component={NavLink}
            to="/education"
            sx={linkStyles}
          >
            Education
          </Button>
          <Button
            fullWidth
            variant="text"
            component={NavLink}
            to="/education"
            sx={linkStyles}
          >
            Interests
          </Button>
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
