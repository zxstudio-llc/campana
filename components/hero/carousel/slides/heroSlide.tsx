'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Slide } from '@/lib/wordpress.d'

export function HeroSlide({ slide }: { slide: Slide }) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      {slide.image?.url && (
        <Box
          component="img"
          src={slide.image.url}
          alt={slide.image.alt ?? slide.title ?? ''}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 3,
          color: 'common.white',
          backgroundColor: 'transparent',
        }}
      >
        {slide.title && (
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              maxWidth: 900,
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
            }}
          >
            {slide.title}
          </Typography>
        )}

        {slide.subtitle && (
          <Typography
            sx={{
              mt: 2,
              maxWidth: 700,
              fontSize: {
                xs: '1rem',
                md: '1.25rem',
              },
            }}
          >
            {slide.subtitle}
          </Typography>
        )}

        {Array.isArray(slide.cta) && slide.cta.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4 }}
          >
            {slide.cta.map((btn, i) => (
              <Button
                key={i}
                href={btn.link}
                variant="contained"
                color="primary"
                size="large"
              >
                {btn.cta_name}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}