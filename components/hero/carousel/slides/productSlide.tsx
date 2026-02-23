'use client';

import { Slide } from '@/lib/wordpress.d';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function ProductSlide({ slide }: { slide: Slide }) {
  return (
    <div className="relative h-full w-full">
      {slide.image?.url && (
        <img
          src={slide.image.url}
          alt={slide.image.alt ?? slide.title ?? ''}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/40 text-white px-6">
        {slide.title && (
          <h1 className="text-4xl md:text-5xl font-bold max-w-4xl">
            {slide.title}
          </h1>
        )}

        {slide.subtitle && (
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            {slide.subtitle}
          </p>
        )}

        {slide.cta?.length && (
          <div className="mt-6 flex gap-4">
            {slide.cta.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
              >
                {btn.cta_name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
