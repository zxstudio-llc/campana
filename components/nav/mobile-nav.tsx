'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { AppMenuItem, GlobalCTA, SiteInfo } from '@/lib/wordpress.d'
import type { WpLanguage } from '@/lib/wordpress'
import Link from 'next/link'
import gsap from "gsap"

type MobileNavProps = {
  open: boolean
  setOpen: (open: boolean) => void
  menuItems: AppMenuItem[]
  cta: GlobalCTA | null
  languages: WpLanguage[]
  siteInfo: SiteInfo | null
}

export function MobileNav({
  menuItems,
  cta,
  open,
  setOpen,
}: MobileNavProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const pathname = usePathname()

  // 1. Forzar el estado inicial apenas se monte para evitar saltos
  useLayoutEffect(() => {
    if (!sidebarRef.current || !navRef.current) return

    const items = navRef.current.querySelectorAll("button")

    // Usamos -100% para asegurar que esté fuera independientemente del ancho
    gsap.set(sidebarRef.current, { xPercent: -100 })
    gsap.set(items, { x: -20, opacity: 0 })
  }, [])

  useEffect(() => {
    if (!sidebarRef.current || !navRef.current) return
    const items = navRef.current.querySelectorAll("button")

    if (timelineRef.current) timelineRef.current.kill()

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 0.6 }
    })

    if (open) {
      tl.to(sidebarRef.current, { xPercent: 0, duration: 0.8 })
        .to(items, {
          x: 0,
          opacity: 1,
          stagger: 0.1,
        }, "-=0.5")
    } else {
      tl.to(items, {
        x: -20,
        opacity: 0,
        stagger: { each: 0.05, from: "end" },
        duration: 0.4
      })
        .to(sidebarRef.current, {
          xPercent: -100,
          ease: "expo.inOut",
          duration: 0.5
        }, "-=0.3")
    }

    timelineRef.current = tl
  }, [open])

  return (
    <>
      {/* MENU BUTTON */}
      <Button
        variant="unstyled"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-center z-50",
          "md:h-14 md:w-14",
          "h-8 w-8",
          "rounded-full",
          "bg-transparent hover:bg-transparent",
          "border-none shadow-none cursor-pointer",
          "transition-all duration-300"
        )}
      >
        <div className="relative w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <div className="relative w-8 h-8 md:w-10 md:h-10">

            <Menu
              className={cn(
                "absolute inset-0 w-8 h-8 md:w-10 md:h-10 transition-all duration-300",
                open
                  ? "opacity-0 rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              )}
            />

            <X
              className={cn(
                "absolute inset-0 w-8 h-8 md:w-10 md:h-10 transition-all duration-300",
                open
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              )}
            />

          </div>
        </div>
      </Button>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-30 h-screen transition-opacity duration-500",
          open ? "bg-black/40 pointer-events-auto" : "bg-transparent pointer-events-none"
        )}
      >

        {/* SIDEBAR */}
        <div
          ref={sidebarRef}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "fixed left-0 top-0 h-screen shadow-2xl z-40",
            "w-[90vw] max-w-[400px] bg-black backdrop-blur-md",
            "flex flex-col justify-center px-10 py-20",
            "translate-x-[-100%]"
          )}
        >

          <div className="absolute right-0 h-40 w-1 bg-gray-500 rounded-full hidden md:block" />

          {/* NAV */}
          <nav
            ref={navRef}
            className="flex flex-col gap-4 text-right"
          >
            {menuItems.map((item) => {

              const active = pathname === item.url

              return (
                <MobileLink
                  key={item.id}
                  href={item.url}
                  onOpenChange={setOpen}
                  className={cn(
                    "text-lg tracking-wide uppercase",
                    active ? "text-white" : "text-white"
                  )}
                >
                  {item.label}
                </MobileLink>
              )
            })}
          </nav>

          {cta?.enabled !== false && cta?.title && cta?.url && (
            <Button
              asChild
              className="block md:hidden rounded-full px-6 font-semibold text-campana-primary bg-campana-secondary hover:bg-campana-secondary"
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
      </div>
    </>
  )
}

interface MobileLinkProps {
  href: string
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {

  const router = useRouter()

  return (
    <button
      onClick={() => {
        router.push(href)
        onOpenChange?.(false)
      }}
      className={cn(
        "text-right font-medium transition-colors duration-300 hover:text-campana-secondary cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  )
}