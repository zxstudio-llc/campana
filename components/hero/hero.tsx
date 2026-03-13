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

    // Allow rendering if we have Mux playback IDs OR legacy desktop_version
    if (!slider || (!slider.acf.mux_playback_web_id)) {
      return null;
    }

    return (
      <HeroLogo
        mux_playback_web_id={slider.acf.mux_playback_web_id}
        mux_playback_mobile_id={slider.acf.mux_playback_mobile_id}
        video_scroll_web={slider.acf.video_scroll_web}
        video_scroll_mobile={slider.acf.video_scroll_mobile}
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
