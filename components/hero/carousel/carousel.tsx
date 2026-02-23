'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import { Slider, Slide } from '@/lib/wordpress.d'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { HeroSlide } from './slides/heroSlide'
import { CorporateSlide } from './slides/corporateSlide'
import { ProductSlide } from './slides/productSlide'
import { DefaultSlide } from './slides/defaultSlide'

const slideComponentMap: Record<string, React.FC<{ slide: Slide }>> = {
  hero: HeroSlide,
  corporate: CorporateSlide,
  product: ProductSlide,
}

interface CarouselProps {
  slider: Slider
}

export function Carousel({ slider }: CarouselProps) {
    const delay = Math.max(Number(slider.acf.delay ?? 12000), 6000)

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop
        autoplay={
          slider.acf.autoplay
            ? {
                delay,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={{
          type: 'custom',
          renderCustom: (_, current, total) => `
            <div class="swiper-bars">
              ${Array.from({ length: total })
                .map(
                  (_, i) =>
                    `<span class="swiper-bar ${
                      i + 1 === current ? 'active' : ''
                    }"></span>`
                )
                .join('')}
            </div>
          `,
        }}
        style={{
          height: '100%',
          width: '100%',
          ['--swiper-delay' as any]: `${delay}ms`,
        }}
      >
        {slider.acf.slides.map((slide, index) => {
          const SlideComponent =
            slide.slide_type && slideComponentMap[slide.slide_type]
              ? slideComponentMap[slide.slide_type]
              : DefaultSlide

          return (
            <SwiperSlide key={index}>
              <SlideComponent slide={slide} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
