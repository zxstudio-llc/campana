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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
      isScrolled
        ? "md:bg-campana-bg-hover/60 md:backdrop-blur-lg md:shadow-2xl bg-transparent"
        : "bg-transparent md:bg-campana-primary/40 md:backdrop-blur-lg"
    )}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <div
          className={cn(
            "flex items-center transition-opacity duration-300",
            mobileOpen ? "opacity-0 pointer-events-none md:opacity-100" : "opacity-100"
          )}
        >
          <SiteLogo siteInfo={siteInfo} />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-2 md:flex">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              asChild
              variant="ghost"
              className="rounded-full font-semibold text-campana-secondary hover:bg-campana-secondary-hover"
            >
              <Link href={item.url}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSelector languages={languages} />

          {cta?.enabled !== false && cta?.title && cta?.url && (
            <Button
              asChild
              className="rounded-full px-6 font-semibold"
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

        {/* MOBILE */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector languages={languages} />
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
    </header>
  )
}
