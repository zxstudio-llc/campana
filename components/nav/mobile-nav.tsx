'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'

import SiteLogo from '@/components/nav/site-logo'

import type { AppMenuItem, GlobalCTA, SiteInfo } from '@/lib/wordpress.d'
import type { WpLanguage } from '@/lib/wordpress'

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
  languages,
  siteInfo,
  open,
  setOpen,
}: MobileNavProps) {

  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>

      <SheetTrigger asChild>
        <Button
          variant="unstyled"
          className={cn(
            'flex items-center justify-center p-2',
            'w-10 h-10 rounded-full',
            'bg-campana-primary hover:bg-campana-primary-hover',
            'border border-campana-secondary/20',
            'shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
            'transition-all duration-300',
            open
              ? 'opacity-0 scale-90 pointer-events-none'
              : 'opacity-100 scale-100'
          )}
        >
          <Menu
            className="w-6 h-6 transition-transform duration-300"
            style={{ color: '#b5934a' }}
          />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          'w-[300px] p-0',
          'bg-campana-primary/50 backdrop-blur-md',
          'border-l border-none',
          'shadow-2xl flex flex-col',
        )}
      >
        {/* HEADER */}
        <SheetHeader className="flex flex-col items-center justify-center pt-6 pb-6 border-b border-campana-secondary/20">
          <SheetTitle>
            <SiteLogo siteInfo={siteInfo} />
          </SheetTitle>
        </SheetHeader>

        {/* CONTENIDO SCROLL */}
        <div className="flex-1 px-6 py-6">
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => {

              const isActive = pathname === item.url

              return (
                <MobileLink
                  key={item.id}
                  href={item.url}
                  onOpenChange={setOpen}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base transition-all duration-300",
                    isActive
                      ? "bg-campana-primary text-white shadow-lg hover:text-campana-secondary"
                      : "text-white hover:text-campana-primary hover:text-campana-secondary"
                  )}
                >
                  {item.label}
                </MobileLink>
              )
            })}


          </nav>
        </div>
        <SheetFooter>
          {cta?.enabled !== false && cta?.title && cta?.url && (
            <div className="pb-8 pt-4 px-6">
              <Button
                asChild
                variant="unstyled"
                className="w-full h-12 rounded-xl font-semibold text-white hover:text-campana-primary bg-campana-primary hover:bg-campana-secondary-hover transition-all duration-300"
              >
                <Link
                  href={cta.url}
                  onClick={() => setOpen(false)}
                >
                  {cta.title}
                </Link>
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
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
        'text-left font-medium text-white transition-colors duration-300 hover:text-[#b5934a]',
        className
      )}
    >
      {children}
    </button>
  )
}