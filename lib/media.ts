export function normalizeMediaUrl(url: string): string {
  if (!url) return ''

  if (url.startsWith('/images') || url.startsWith('/icons')) {
    return url
  }

  try {
    const parsed = new URL(url)

    if (parsed.pathname.includes('/wp-content/uploads')) {
      return `/media${parsed.pathname.replace('/wp-content/uploads', '')}`
    }

    return url
  } catch {
    return url
  }
}
