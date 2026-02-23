"use client";

import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

export default function ThemeMode(props: IconButtonOwnProps) {
  const { mode, systemMode, setMode } = useColorScheme();

  // Función para alternar el modo directamente
  const handleToggleMode = () => {
    const targetMode = resolvedMode === 'light' ? 'dark' : 'light';
    setMode(targetMode);
  };

  // Evitar saltos de hidratación (flicker)
  if (!mode) {
    return (
      <Box
        sx={{
          width: '2.25rem',
          height: '2.25rem',
        }}
      />
    );
  }

  const resolvedMode = (systemMode || mode) as 'light' | 'dark';

  return (
    <IconButton
      data-screenshot="toggle-mode"
      onClick={handleToggleMode}
      disableRipple
      size="small"
      // Mantenemos la consistencia de color con el resto de la barra
      sx={{
        color: (theme) => 
          theme.palette.mode === 'light' 
            ? 'primary.dark'
            : 'text.primary',
        ...props.sx,
      }}
      {...props}
    >
      {resolvedMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}