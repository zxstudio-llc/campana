import { getSliderById } from '@/lib/wordpress'
import type { Page } from '@/lib/wordpress.d'
import { StaticHero } from '@/components/hero/static/static'
import HeroScroll from './components/hero-scroll'
import HeroLogo from './components/hero-logo'

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

    if (!slider || (!slider.acf.bg_photo_desktop || !slider.acf.bg_photo_mobile)) {
      return null;
    }

    return (
      <HeroLogo
        bg_photo_desktop={slider.acf.bg_photo_desktop}
        bg_photo_mobile={slider.acf.bg_photo_mobile}
      />
    )
  }

  if (hero.hero_type === 'static' && hero.hero_static) {
    return <>
      <StaticHero hero={hero.hero_static} />
    </>
  }

  return null
}
