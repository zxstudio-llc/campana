import { getSliderById } from '@/lib/wordpress'
import type { Page } from '@/lib/wordpress.d'
import { StaticHero } from '@/components/hero/static/static'
import HeroScroll from './components/hero-scroll'

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

    if (!slider || !slider.acf.desktop_version || !slider.acf.mobile_version) return null

    return (
      <HeroScroll
        videoSrcDesktop={slider.acf.desktop_version}
        videoSrcMobile={slider.acf.mobile_version}
      >
        <div className="reveal-rotate opacity-0 -mt-40 md:mt-0 md:translate-y-10 absolute">
        </div>
      </HeroScroll>
    )
  }

  if (hero.hero_type === 'static' && hero.hero_static) {
    return <>
      <StaticHero hero={hero.hero_static} />
    </>
  }

  return null
}
