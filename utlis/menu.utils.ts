import type { WpMenuItem, AppMenuItem } from '@/lib/wordpress.d'
import { menuConfig } from '@/menu.config'

export function normalizeWpUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.pathname === '' ? '/' : parsed.pathname
  } catch {
    return '/'
  }
}

export function resolveMenuHref(item: WpMenuItem): string {
  if (item.slug === menuConfig.homeSlug) {
    return '/'
  }

  return normalizeWpUrl(item.url)
}

export function buildMenuUrl(slug: string, lang: string) {
  if (lang === 'en') {
    return slug === 'home' ? '/' : `/${slug}`
  }

  return slug === 'home'
    ? `/${lang}`
    : `/${lang}/${slug}`
}


export function mapWpMenu(
  items: WpMenuItem[],
  lang?: string
): AppMenuItem[] {
  const homeSlugs = ['home', 'inicio']
  const roots: AppMenuItem[] = []
  const map = new Map<number, AppMenuItem>();

  items.forEach((item, idx) => {
    if (!item) {
      console.warn(`[MENU] Item en índice ${idx} es undefined o null`);
      return;
    }

    let path = ''
    const slug = (item.slug || '').toString()
    const lowerSlug = slug.toLowerCase()

    if (homeSlugs.includes(lowerSlug)) {
      path = ''
    } else {
      path = slug ? `/${slug}` : ''
    }

    map.set(item.ID, {
      id: item.ID,
      label: item.title || 'Sin título',
      url: `/${lang}${path}`,
      children: [],
    })
  })

  items.forEach((item) => {
    const parentId = Number(item.menu_item_parent)

    if (parentId && map.has(parentId)) {
      map.get(parentId)!.children!.push(map.get(item.ID)!)
    } else {
      roots.push(map.get(item.ID)!)
    }
  })

  return roots
}
