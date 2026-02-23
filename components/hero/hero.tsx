import { Carousel } from '@/components/hero/carousel/carousel'
import { getSliderById } from '@/lib/wordpress'
import { StaticHero } from '@/components/hero/static/static'
import type { Page } from '@/lib/wordpress.d'

interface HeroProps {
  page: Page
}

export async function Hero({ page }: HeroProps) {
  const acf = page.acf

  if (!acf || acf.page_template !== 'default') return null

  const hero = acf.default?.hero
  if (!hero) return null

  if (hero.hero_type === 'slider' && typeof hero.hero_slider === 'number') {
    const slider = await getSliderById(hero.hero_slider)
    if (!slider) return null
    return <Carousel slider={slider} />
  }

  if (hero.hero_type === 'static' && hero.hero_static) {
    return <StaticHero hero={hero.hero_static} />
  }

  return null
}
