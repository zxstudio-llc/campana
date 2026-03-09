'use client'

import Image from 'next/image'
import type { HeroStatic } from '@/lib/wordpress.d'

interface StaticHeroProps {
  hero: HeroStatic
}

export function StaticHero({ hero }: StaticHeroProps) {
  const description = hero.description

  const align =
    description?.content_position === 'left'
      ? 'items-start text-left'
      : description?.content_position === 'right'
        ? 'items-end text-right'
        : 'items-center text-center'

  const background =
    hero.background_image || null

  const ctas =
    Array.isArray(hero.cta) ? hero.cta : []

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {background && (
        <Image
          src={background.url}
          alt={background.alt ?? ''}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className={`relative z-10 flex h-full flex-col justify-center px-6 ${align}`}>
        {description?.title && (
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl">
            {description.title}
          </h1>
        )}

        {description?.subtitle && (
          <p className="mt-4 text-lg text-white max-w-2xl">
            {description.subtitle}
          </p>
        )}

        {ctas.length > 0 && (
          <div className="mt-6 flex gap-4">
            {ctas.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                className="px-6 py-3 bg-white text-black rounded-md font-semibold"
              >
                {btn.cta_name}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-black/40" />
    </section>
  )
}
