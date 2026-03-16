import querystring from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
  GlobalCTA,
  WpMenuItem,
  AppMenuItem,
  Slider,
  ActivoEstrategico,
  OurValues,
  Projects,
  Timeline,
  SiteInfo,
  Investment,
  Biography,
  Faq,
} from "./wordpress.d";
import { mapWpMenu } from "@/utlis/menu.utils";

const baseUrl = process.env.WORDPRESS_URL;
const isConfigured = Boolean(baseUrl);

if (!isConfigured) {
  console.warn(
    "WORDPRESS_URL environment variable is not defined - WordPress features will be unavailable"
  );
}

class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

export interface WordPressPaginationHeaders {
  total: number;
  totalPages: number;
}

export interface WordPressResponse<T> {
  data: T;
  headers: WordPressPaginationHeaders;
}

const USER_AGENT = "Next.js WordPress Client";
const CACHE_TTL = 3600;

async function wordpressFetch<T>(
  path: string,
  query?: Record<string, any>,
  tags: string[] = ["wordpress"],
  lang?: string,
  retries: number = 2
): Promise<T> {
  if (!baseUrl) {
    throw new Error("WordPress URL not configured");
  }

  const finalQuery = lang ? { ...query, lang } : query;
  const url = `${baseUrl}${path}${finalQuery ? `?${querystring.stringify(finalQuery)}` : ""}`;

  let lastError: any;
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
        next: { tags, revalidate: CACHE_TTL },
      });

      if (!response.ok) {
        throw new WordPressAPIError(
          `WordPress API request failed: ${response.statusText}`,
          response.status,
          url
        );
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (i < retries) {
        const delay = Math.pow(2, i) * 1000;
        console.warn(`[WP API] Retry ${i + 1}/${retries} for ${url} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

async function wordpressFetchGraceful<T>(
  path: string,
  fallback: T,
  query?: Record<string, any>,
  tags: string[] = ["wordpress"]
): Promise<T> {
  if (!isConfigured) return fallback;

  try {
    return await wordpressFetch<T>(path, query, tags);
  } catch {
    return fallback;
  }
}

async function wordpressFetchPaginated<T>(
  path: string,
  query?: Record<string, any>,
  tags: string[] = ["wordpress"],
  retries: number = 2
): Promise<WordPressResponse<T>> {
  if (!baseUrl) {
    throw new Error("WordPress URL not configured");
  }

  const url = `${baseUrl}${path}${query ? `?${querystring.stringify(query)}` : ""}`;

  let lastError: any;
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
        next: { tags, revalidate: CACHE_TTL },
      });

      if (!response.ok) {
        throw new WordPressAPIError(
          `WordPress API request failed: ${response.statusText}`,
          response.status,
          url
        );
      }

      return {
        data: await response.json(),
        headers: {
          total: parseInt(response.headers.get("X-WP-Total") || "0", 10),
          totalPages: parseInt(response.headers.get("X-WP-TotalPages") || "0", 10),
        },
      };
    } catch (error) {
      lastError = error;
      if (i < retries) {
        const delay = Math.pow(2, i) * 1000;
        console.warn(`[WP API] Retry ${i + 1}/${retries} for ${url} (paginated) after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

async function wordpressFetchPaginatedGraceful<T>(
  path: string,
  query?: Record<string, any>,
  tags: string[] = ["wordpress"]
): Promise<WordPressResponse<T[]>> {
  const emptyResponse: WordPressResponse<T[]> = {
    data: [],
    headers: { total: 0, totalPages: 0 },
  };

  if (!isConfigured) return emptyResponse;

  try {
    return await wordpressFetchPaginated<T[]>(path, query, tags);
  } catch {
    return emptyResponse;
  }
}

export async function getGlobalCTA(): Promise<GlobalCTA | null> {
  if (!baseUrl) return null;

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/site/v1/cta`,
      { cache: 'no-store' }
    )

    if (!res.ok) return null

    const raw = await res.json()

    return {
      enabled: raw.enabled,
      title: raw.title,
      url: raw.url,
      newTab: raw.newTab,
    }
  } catch (error) {
    console.error("[WP API] Error en getGlobalCTA:", error);
    return null;
  }
}

export async function getSliderById(id: number): Promise<Slider | null> {
  if (!baseUrl) return null;

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/sliders/${id}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return null
    const data = await res.json();
    return data
  } catch (error) {
    console.error(`[WP API] Error en getSliderById(${id}):`, error);
    return null;
  }
}

export async function getProjectsByIds(
  ids: number[]
): Promise<Projects[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/projects?include=${ids.join(",")}&per_page=100&acf_format=standard`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []

    const data: Projects[] = await res.json()

    return ids
      .map((id) => data.find((p) => p.id === id))
      .filter(Boolean) as Projects[]
  } catch (error) {
    console.error("[WP API] Error en getProjectsByIds:", error);
    return [];
  }
}

export async function getTimelineByIds(
  ids: number[]
): Promise<Timeline[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/timelines?include=${ids.join(",")}&per_page=100&acf_format=standard`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []

    const data: Timeline[] = await res.json()

    return ids
      .map((id) => data.find((p) => p.id === id))
      .filter(Boolean) as Timeline[]
  } catch (error) {
    console.error("[WP API] Error en getTimelineByIds:", error);
    return [];
  }
}

export async function getOurValuesById(ids: number[]): Promise<OurValues[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/our-values?include=${ids.join(",")}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []
    const data = await res.json();

    // Ordenar resultados según el orden de IDs pedido
    return ids
      .map((id) => data.find((item: any) => item.id === id))
      .filter(Boolean) as OurValues[];
  } catch (error) {
    console.error("[WP API] Error en getOurValuesById:", error);
    return [];
  }
}

export async function getActivoEstrategicoById(ids: number[]): Promise<ActivoEstrategico[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/activos-estrategicos?include=${ids.join(",")}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []
    const data = await res.json();

    // Ordenar resultados según el orden de IDs pedido
    return ids
      .map((id) => data.find((item: any) => item.id === id))
      .filter(Boolean) as ActivoEstrategico[];
  } catch (error) {
    console.error("[WP API] Error en getActivoEstrategicoById:", error);
    return [];
  }
}

export async function getInvestmentById(
  ids: number[]
): Promise<Investment[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/investments?include=${ids.join(",")}&orderby=include&order=asc&per_page=100&acf_format=standard`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []

    const data: Investment[] = await res.json()

    return ids
      .map((id) => data.find((p) => p.id === id))
      .filter(Boolean) as Investment[]
  } catch (error) {
    console.error("[WP API] Error en getInvestmentById:", error);
    return [];
  }
}

export async function getBiographyById(
  ids: number[]
): Promise<Biography[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/biographies?include=${ids.join(",")}&acf_format=standard`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []

    const data: Biography[] = await res.json()

    return ids
      .map((id) => data.find((p) => p.id === id))
      .filter(Boolean) as Biography[]
  } catch (error) {
    console.error("[WP API] Error en getBiographyById:", error);
    return [];
  }
}

export async function getFaqById(
  ids: number[]
): Promise<Faq[]> {
  if (!baseUrl || !ids?.length) return []

  try {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/faqs?include=${ids.join(",")}&acf_format=standard`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []

    const data: Faq[] = await res.json()

    return ids
      .map((id) => data.find((p) => p.id === id))
      .filter(Boolean) as Faq[]
  } catch (error) {
    console.error("[WP API] Error en getFaqById:", error);
    return [];
  }
}

export async function getMainMenu(
  menuId: number,
  lang: string
): Promise<AppMenuItem[]> {
  return wordpressFetchGraceful<any>(
    `/wp-json/menus/v1/menus/${menuId}`,
    null,
    undefined,
    ["wordpress", "menus", `menu-${menuId}`]
  ).then((data) => {
    if (!data || !Array.isArray(data.items)) {
      return [];
    }

    return mapWpMenu(data.items as WpMenuItem[], lang);
  });
}

export async function getPostsPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    author?: string;
    tag?: string;
    category?: string;
    search?: string;
  }
): Promise<WordPressResponse<Post[]>> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  const cacheTags = ["wordpress", "posts", `posts-page-${page}`];

  if (filterParams?.search) {
    query.search = filterParams.search;
    cacheTags.push("posts-search");
  }
  if (filterParams?.author) {
    query.author = filterParams.author;
    cacheTags.push(`posts-author-${filterParams.author}`);
  }
  if (filterParams?.tag) {
    query.tags = filterParams.tag;
    cacheTags.push(`posts-tag-${filterParams.tag}`);
  }
  if (filterParams?.category) {
    query.categories = filterParams.category;
    cacheTags.push(`posts-category-${filterParams.category}`);
  }

  return wordpressFetchPaginatedGraceful<Post>(
    "/wp-json/wp/v2/posts",
    query,
    cacheTags
  );
}

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<Post[]> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) query.search = filterParams.search;
  if (filterParams?.author) query.author = filterParams.author;
  if (filterParams?.tag) query.tags = filterParams.tag;
  if (filterParams?.category) query.categories = filterParams.category;

  return wordpressFetchGraceful<Post[]>("/wp-json/wp/v2/posts", [], query, [
    "wordpress",
    "posts",
  ]);
}

export async function getPostById(id: number): Promise<Post> {
  return wordpressFetch<Post>(`/wp-json/wp/v2/posts/${id}`);
}

export async function getSiteInfo(): Promise<SiteInfo | null> {
  if (!process.env.WORDPRESS_URL) return null;

  try {
    const res = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/custom/v1/site-info`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await wordpressFetchGraceful<Post[]>(
    "/wp-json/wp/v2/posts",
    [],
    { slug }
  );
  return posts[0];
}

export async function getAllCategories(): Promise<Category[]> {
  return wordpressFetchGraceful<Category[]>(
    "/wp-json/wp/v2/categories",
    [],
    undefined,
    ["wordpress", "categories"]
  );
}

export async function getCategoryById(id: number): Promise<Category> {
  return wordpressFetch<Category>(`/wp-json/wp/v2/categories/${id}`);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/categories", { slug }).then(
    (categories) => categories[0]
  );
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", {
    categories: categoryId,
  });
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { tags: tagId });
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags", { post: postId });
}

export async function getAllTags(): Promise<Tag[]> {
  return wordpressFetchGraceful<Tag[]>("/wp-json/wp/v2/tags", [], undefined, [
    "wordpress",
    "tags",
  ]);
}

export async function getTagById(id: number): Promise<Tag> {
  return wordpressFetch<Tag>(`/wp-json/wp/v2/tags/${id}`);
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags", { slug }).then(
    (tags) => tags[0]
  );
}

export async function getAllPages(): Promise<Page[]> {
  return wordpressFetchGraceful<Page[]>("/wp-json/wp/v2/pages", [], undefined, [
    "wordpress",
    "pages",
  ]);
}

export async function getPageById(id: number): Promise<Page> {
  return wordpressFetch<Page>(`/wp-json/wp/v2/pages/${id}`);
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  try {
    const pages = await wordpressFetchGraceful<Page[]>(
      "/wp-json/wp/v2/pages",
      [],
      { slug }
    );

    if (Array.isArray(pages) && pages.length > 0) {
      const page = pages[0];
      return page;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

export async function getAllAuthors(): Promise<Author[]> {
  return wordpressFetchGraceful<Author[]>(
    "/wp-json/wp/v2/users",
    [],
    undefined,
    ["wordpress", "authors"]
  );
}

export async function getAuthorById(id: number): Promise<Author> {
  return wordpressFetch<Author>(`/wp-json/wp/v2/users/${id}`);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  return wordpressFetch<Author[]>("/wp-json/wp/v2/users", { slug }).then(
    (users) => users[0]
  );
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { author: authorId });
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { author: author.id });
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", {
    categories: category.id,
  });
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { tags: tag.id });
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  return wordpressFetch<FeaturedMedia>(`/wp-json/wp/v2/media/${id}`);
}

export async function searchCategories(query: string): Promise<Category[]> {
  return wordpressFetchGraceful<Category[]>(
    "/wp-json/wp/v2/categories",
    [],
    { search: query, per_page: 100 }
  );
}

export async function searchTags(query: string): Promise<Tag[]> {
  return wordpressFetchGraceful<Tag[]>("/wp-json/wp/v2/tags", [], {
    search: query,
    per_page: 100,
  });
}

export async function searchAuthors(query: string): Promise<Author[]> {
  return wordpressFetchGraceful<Author[]>("/wp-json/wp/v2/users", [], {
    search: query,
    per_page: 100,
  });
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  if (!isConfigured) return [];

  try {
    const allSlugs: { slug: string }[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await wordpressFetchPaginated<Post[]>(
        "/wp-json/wp/v2/posts",
        { per_page: 100, page, _fields: "slug" }
      );

      allSlugs.push(...response.data.map((post) => ({ slug: post.slug })));
      hasMore = page < response.headers.totalPages;
      page++;
    }

    return allSlugs;
  } catch {
    return [];
  }
}

export async function getPostsByCategoryPaginated(
  categoryId: number,
  page: number = 1,
  perPage: number = 9
): Promise<WordPressResponse<Post[]>> {
  return wordpressFetchPaginatedGraceful<Post>("/wp-json/wp/v2/posts", {
    _embed: true,
    per_page: perPage,
    page,
    categories: categoryId,
  });
}

export async function getPostsByTagPaginated(
  tagId: number,
  page: number = 1,
  perPage: number = 9
): Promise<WordPressResponse<Post[]>> {
  return wordpressFetchPaginatedGraceful<Post>("/wp-json/wp/v2/posts", {
    _embed: true,
    per_page: perPage,
    page,
    tags: tagId,
  });
}

export async function getPostsByAuthorPaginated(
  authorId: number,
  page: number = 1,
  perPage: number = 9
): Promise<WordPressResponse<Post[]>> {
  return wordpressFetchPaginatedGraceful<Post>("/wp-json/wp/v2/posts", {
    _embed: true,
    per_page: perPage,
    page,
    author: authorId,
  });
}

export interface WpLanguage {
  code: string;
  name: string;
  locale: string;
  flag: string;
}

export async function getActiveLanguages(): Promise<WpLanguage[]> {
  return wordpressFetchGraceful<WpLanguage[]>(
    "/wp-json/polylang/v2/languages",
    [
      { code: "en", name: "English", locale: "en_US", flag: "" },
      { code: "es", name: "Español", locale: "es_ES", flag: "" }
    ]
  );
}

export { WordPressAPIError, type Timeline };
