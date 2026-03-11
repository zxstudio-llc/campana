'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Check, ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Language = {
  code: string
  name: string
  flag: string
}

export function LanguageSelector({ languages }: { languages: Language[] }) {
  const router = useRouter()
  const pathname = usePathname()

  const segments = pathname.split('/')
  const currentLang =
    ['en', 'es'].includes(segments[1]) ? segments[1] : 'en'

  const currentLanguage =
    languages.find((l) => l.code === currentLang) ?? languages[0]

  const handleSelect = (langCode: string) => {
    const segments = pathname.split('/')

    if (['en', 'es'].includes(segments[1])) {
      segments[1] = langCode
    } else {
      segments.splice(1, 0, langCode)
    }

    router.push(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="unstyled"
          className="flex items-center gap-0 md:gap-2 px-0 w-16 md:w-36 rounded-full bg-transparent hover:bg-transparent md:bg-black md:hover:bg-black text-white hover:text-white md:text-campana-secondary md:hover:text-campana-secondary"
        >
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={30}
            height={20}
          />

          <span className="hidden text-sm sm:inline">
            {currentLanguage.name}
          </span>

          <ChevronDown className="h-7 w-7 text-campana-secondary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[160px] bg-campana-primary hover:bg-campana-primary-hover text-campana-secondary hover:text-campana-secondary border-none">
        {languages.map((lang) => {
          const isActive = lang.code === currentLang

          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'flex items-center gap-3 cursor-pointer',
                isActive && 'font-medium'
              )}
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={20}
                height={14}
              />

              <span className="text-sm">{lang.name}</span>

              {isActive && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
