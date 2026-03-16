'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { AppMenuItem, GlobalCTA, SiteInfo } from '@/lib/wordpress.d'
import type { WpLanguage } from '@/lib/wordpress'
import Link from 'next/link'

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [setOpen])

  const pathname = usePathname()

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
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute left-0 top-0 h-screen shadow-2xl z-40",
            "w-screen max-w-[900px]",
            "flex flex-col justify-center",
            "px-10 py-20",
            "transition-transform duration-700 ease-out",
            open ? "translate-x-0" : "-translate-x-full",

            "fixed inset-0 bg-black/20 backdrop-blur-sm"
          )}
        >
          <div className="absolute right-0 h-40 w-1 bg-campana-nav-bg-hover rounded-full hidden md:block" />
          {/* NAV */}
          <nav className="flex flex-col gap-4 text-right">
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
              className="block md:hidden rounded-full px-6 font-semibold text-campana-primary bg-campana-secondary hover:bg-campana-secondary hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
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