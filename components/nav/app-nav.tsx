'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SiteLogo from './site-logo'
import { LanguageSelector } from '../lang/language-selector'
import type { AppMenuItem, GlobalCTA, SiteInfo } from '@/lib/wordpress.d'
import type { WpLanguage } from '@/lib/wordpress'
import { MobileNav } from './mobile-nav'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type AppNavProps = {
  menuItems: AppMenuItem[]
  cta: GlobalCTA | null
  languages: WpLanguage[]
  siteInfo: SiteInfo | null
}

export default function AppNav({ menuItems, cta, languages, siteInfo }: AppNavProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false)

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll <= 0) {
        setIsHidden(false)
        return
      }

      if (currentScroll > lastScroll && currentScroll > 80) {
        // scrolling down
        setIsHidden(true)
      } else if (currentScroll < lastScroll) {
        // scrolling up
        setIsHidden(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-500",
        isHidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="mx-auto flex h-20 max-w-screen items-center justify-between px-6 md:px-20">
        {/* LOGO */}
        <div
          className="flex items-center z-50 transition-opacity duration-300"
        >
          <div className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            <SiteLogo siteInfo={siteInfo} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="items-center gap-0 md:gap-3 flex z-50">
            <LanguageSelector languages={languages} />

            {cta?.enabled !== false && cta?.title && cta?.url && (
              <Button
                asChild
                className="hidden md:block rounded-full px-6 font-semibold text-campana-primary bg-white/60 backdrop-blur-xl hover:bg-white/60 hover:backdrop-blur-xl"
                variant="secondary"
              >
                <Link
                  href={cta.url}
                  target={cta.newTab ? '_blank' : undefined}
                >
                  {cta.title}
                </Link>
              </Button>
            )}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="items-center  flex ">
            <MobileNav
              open={mobileOpen}
              setOpen={setMobileOpen}
              menuItems={menuItems}
              cta={cta}
              languages={languages}
              siteInfo={siteInfo}
            />
          </div>
        </div>
      </div>
    </header >
  )
}
