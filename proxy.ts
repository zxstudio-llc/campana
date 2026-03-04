import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es']
const defaultLocale = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return
  }

  const segments = pathname.split('/')
  const firstSegment = segments[1]

  // Si NO es un idioma válido → redirigir
  if (!locales.includes(firstSegment)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
}
