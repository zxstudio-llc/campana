import { NextRequest, NextResponse } from 'next/server'

const WP_BASE =
  process.env.WORDPRESS_URL + '/wp-content/uploads'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params

  if (!path || !path.length) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const mediaPath = path.join('/')
  const wpUrl = `${WP_BASE}/${mediaPath}`

  const res = await fetch(wpUrl, {
    headers: {
      'User-Agent': 'ZX-Studio Media Proxy',
    },
    cache: 'force-cache',
  })

  if (!res.ok) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return new NextResponse(res.body, {
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
