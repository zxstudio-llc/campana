'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"
import { useRouter, usePathname } from 'next/navigation'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import type { AppMenuItem, SiteInfo } from '@/lib/wordpress.d'

// Diccionario de traducciones
const i18n = {
    es: {
        explorar: "Explorar",
        inversiones: "Inversiones",
        compania: "Compañía",
        derechos: "Todos los derechos reservados.",
        fallbackDesc: "Líderes en desarrollo inmobiliario con solidez y confianza."
    },
    en: {
        explorar: "Explore",
        inversiones: "Investments",
        compania: "Company",
        derechos: "All rights reserved.",
        fallbackDesc: "Leaders in real estate development with solidity and trust."
    }
}

interface FooterProps {
    menuItems: AppMenuItem[]
    siteInfo?: SiteInfo | null
}

const Footer = ({ menuItems, siteInfo }: FooterProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const scrollTo = useScrollToSection()

    const lang = (pathname.split('/')[1] || 'es') as keyof typeof i18n
    const t = i18n[lang] || i18n.es

    const formatDescription = (desc: string | undefined) => {
        if (!desc) return t.fallbackDesc
        return desc.includes('|') ? desc.split('|').join(' • ') : desc
    }

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()

        const isHome = href === '/' || href.endsWith('/inicio') || href.endsWith('/home');

        if (isHome) {
            router.push(`/${lang}`);
            return;
        }

        if (href.includes('#')) {
            const [path, hash] = href.split('#')
            const id = hash

            const cleanPathname = pathname.replace(/\/$/, '')
            const targetPath = `/${lang}${path}`.replace(/\/$/, '')

            const isCurrentPath = cleanPathname === targetPath || (path === '' && cleanPathname === `/${lang}`);

            if (isCurrentPath) {
                scrollTo(id)
            } else {
                router.push(`/${lang}${path}#${id}`)
                setTimeout(() => scrollTo(id), 800)
            }
        } else {
            const finalHref = href.startsWith('/') && !href.startsWith(`/${lang}`)
                ? `/${lang}${href}`
                : href;

            router.push(finalHref)
        }
    }

    const column1 = menuItems.slice(0, 4)
    const column2 = menuItems.slice(4, 8)
    const column3 = menuItems.slice(8)

    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-24 pb-12 px-6 w-full relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-start mb-8">

                    {/* Columna 1: Branding */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex items-center">
                            <Link href={`/${lang}`} className="flex items-center">
                                <Image
                                    src={siteInfo?.logo?.url || "/assets/logo.svg"}
                                    alt={siteInfo?.title || "Logo"}
                                    width={280}
                                    height={90}
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center lg:items-start">
                            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                                {formatDescription(siteInfo?.description)}
                            </p>
                        </div>
                    </div>

                    {/* Contenedor Dinámico para Columnas */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 pt-2">
                        {[column1, column2, column3].map((column, idx) => (
                            column.length > 0 && (
                                <div key={idx} className="flex flex-col">
                                    <h3 className="text-white font-semibold text-sm mb-6 tracking-wider uppercase">
                                        {idx === 0 ? t.explorar : idx === 1 ? t.inversiones : t.compania}
                                    </h3>
                                    <ul className="space-y-4 text-sm text-gray-400">
                                        {column.map((item) => (
                                            <li key={item.id}>
                                                <a
                                                    href={item.url}
                                                    onClick={(e) => handleNavigation(e, item.url)}
                                                    className="hover:text-[#b5934a] transition-colors cursor-pointer"
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Línea final y Copyright */}
                <div className="mt-2 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs tracking-tight">
                        &copy; {new Date().getFullYear()} {siteInfo?.title || "Grupo Campana"}. {t.derechos}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer