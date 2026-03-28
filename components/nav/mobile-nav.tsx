'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { AppMenuItem, GlobalCTA, SiteInfo } from '@/lib/wordpress.d'
import type { WpLanguage } from '@/lib/wordpress'
import gsap from "gsap"
import { useScrollToSection } from '@/hooks/useScrollToSection'

type MobileNavProps = {
  open: boolean
  setOpen: (open: boolean) => void
  menuItems: AppMenuItem[]
  languages: WpLanguage[]
  siteInfo: SiteInfo | null
}

export function MobileNav({
  menuItems,
  open,
  setOpen,
}: MobileNavProps) {

  const sidebarRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const pathname = usePathname()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [setOpen])

  useLayoutEffect(() => {
    if (!sidebarRef.current || !navRef.current) return

    const items = navRef.current.querySelectorAll(".nav-item")
    const sidebarWidth = sidebarRef.current.offsetWidth

    gsap.set(sidebarRef.current, { x: -sidebarWidth })
    gsap.set(items, { x: -sidebarWidth, opacity: 0 })
  }, [])

  useEffect(() => {
    if (!sidebarRef.current || !navRef.current) return

    const items = navRef.current.querySelectorAll(".nav-item")

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const sidebarWidth = sidebarRef.current.offsetWidth
    const tl = gsap.timeline()

    if (open) {
      tl.to(sidebarRef.current, {
        x: 0,
        duration: 0.65,
        ease: "expo.out"
      })
      tl.to(items, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.12
      }, "-=0.35")
    } else {
      tl.to(items, {
        x: -sidebarWidth,
        opacity: 0,
        duration: 0.45,
        ease: "expo.in",
        stagger: {
          each: 0.1,
          from: "end"
        }
      })
      tl.to(sidebarRef.current, {
        x: -sidebarWidth,
        duration: 0.55,
        ease: "expo.in"
      }, "-=0.25")
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
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* SIDEBAR */}
        <div
          ref={sidebarRef}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute left-0 top-0 h-screen shadow-2xl z-40",
            "w-screen max-w-[900px]",
            "flex flex-col justify-center",
            "px-10 py-20",
            "fixed inset-0 bg-black/20 backdrop-blur-sm"
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

function MobileLink({ href, onOpenChange, className, children }: MobileLinkProps) {
  const router = useRouter()
  const scrollTo = useScrollToSection()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const url = new URL(href, window.location.origin)
    const hash = url.hash
    const path = url.pathname

    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)

      if (el) {
        scrollTo(id)
      } else {
        router.push(`${path}${hash}`)
        setTimeout(() => scrollTo(id), 800)
      }
    } else {
      router.push(href)
    }

    onOpenChange?.(false)
  }

  return (

    <a href={href}
      onClick={handleClick}
      className={
        cn(
          'nav-item text-right font-medium transition-colors duration-300 hover:text-campana-secondary cursor-pointer',
          className
        )
      }
    >
      {children}
    </a >
  )
}