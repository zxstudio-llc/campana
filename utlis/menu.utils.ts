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
  const homeSlugs = ['home', 'inicio', 'shouye']
  const roots: AppMenuItem[] = []
  const map = new Map<number, AppMenuItem>();

  items.forEach((item) => {
    let path = ''

    if (homeSlugs.includes(item.slug.toLowerCase())) {
      path = ''
    } else {
      path = `/${item.slug}`
    }

    map.set(item.ID, {
      id: item.ID,
      label: item.title,
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
