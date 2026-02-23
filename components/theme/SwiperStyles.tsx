'use client'

import { GlobalStyles, useTheme } from '@mui/material'

export function SwiperStyles() {
  const theme = useTheme()

  return (
    <GlobalStyles
      styles={{
        /* Fade más suave (Material easing) */
        '.swiper-fade .swiper-slide': {
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        
        /* Ocultar flechas */
        '.swiper-button-prev, .swiper-button-next': {
          display: 'none',
        },

        /* Contenedor de barras */
        '.swiper-bars': {
          position: 'absolute',
          right: theme.spacing(4),
          bottom: theme.spacing(4),
          display: 'flex',
          gap: theme.spacing(1),
          zIndex: 10,
        },

        /* Barra base */
        '.swiper-bar': {
          width: 75,
          height: 4,
          backgroundColor: theme.palette.grey[400],
          opacity: 0.4,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        },

        /* Barra activa */
        '.swiper-bar.active': {
          opacity: 1,
        },

        '.swiper-bar.active::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: theme.palette.common.white,
          transformOrigin: 'left',
          animation: 'swiper-progress var(--swiper-delay) linear forwards',
        },

        '@keyframes swiper-progress': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      }}
    />
  )
}
