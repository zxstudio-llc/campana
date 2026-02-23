"use client";

import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SiteLogo from './site-logo';
import type { AppMenuItem, GlobalCTA } from '@/lib/wordpress.d';
import type { WpLanguage } from '@/lib/wordpress';
import { LanguageSelector } from '../lang/language-selector';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  boxShadow: theme.shadows[1],
  backgroundColor: alpha(theme.palette.background.paper, 1),
  backdropFilter: 'blur(8px)',
  padding: '8px 12px',
}));

type AppNavProps = {
  menuItems: AppMenuItem[];
  cta: GlobalCTA | null;
  languages: WpLanguage[];
};

export default function AppNav({ menuItems, cta, languages }: AppNavProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <StyledToolbar variant="dense" disableGutters>
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
              <SiteLogo />
            </Box>


            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, ml: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    href={item.url}
                    variant="text"
                    size="small"
                    sx={{
                      borderRadius: '28px',
                      color: 'primary.dark',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.08),
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              

            {/* DESKTOP CTA */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <LanguageSelector languages={languages} />
              {cta?.enabled !== false && cta?.title && cta?.url && (
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  disableElevation
                  href={cta.url}
                  target={cta.newTab ? '_blank' : undefined}
                  sx={{ 
                    borderRadius: '28px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3
                  }}
                >
                  {cta.title}
                </Button>
              )}
            </Box>

            {/* MOBILE SECTION */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
              
              <IconButton
                aria-label="Menu button"
                onClick={toggleDrawer(!open)}
                sx={{
                  // Z-index alto para que el botón de cerrar sea visible sobre el Drawer
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                  color: 'primary.dark', // Navy fijo
                }}
              >
                {/* Cambio de icono dinámico */}
                {open ? <CloseRoundedIcon /> : <MenuIcon />}
              </IconButton>
              <LanguageSelector languages={languages} />

              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                slotProps={{
                  backdrop: { 
                    sx: { backgroundColor: 'transparent' } 
                  },
                  paper: {
                    sx: {
                      backgroundImage: 'none',
                      backgroundColor: 'background.default',
                      paddingTop: '64px', 
                      boxShadow: (theme) => theme.shadows[8],
                    },
                  }
                }}
              >
                <Box sx={{ p: 2 }}>
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      component="a"
                      href={item.url}
                      onClick={toggleDrawer(false)}
                      sx={{
                        borderRadius: 1,
                        color: 'primary.dark', // Navy fijo
                        fontWeight: 500,
                        my: 1
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  {cta?.enabled !== false && cta?.title && cta?.url && (
                    <Box sx={{ pt: 1 }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        fullWidth
                        disableElevation
                        href={cta.url}
                        sx={{ borderRadius: '28px', textTransform: 'none' }}
                      >
                        {cta.title}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Container>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}