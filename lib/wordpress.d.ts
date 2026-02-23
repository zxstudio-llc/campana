// Common types that are reused across multiple entities
interface WPEntity {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  link: string;
  guid: {
    rendered: string;
  };
}

interface RenderedContent {
  rendered: string;
  protected: boolean;
}

interface RenderedTitle {
  rendered: string;
}

// Media types
interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<string, MediaSize>;
}

export interface FeaturedMedia extends WPEntity {
  title: RenderedTitle;
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: MediaDetails;
  source_url: string;
}

export interface GlobalCTA {
  enabled?: boolean;
  title?: string;
  url?: string;
  newTab?: boolean;
}

export interface WpMenuItem {
  ID: number;
  title: string;
  url: string;
  slug: string;
  menu_item_parent: string;
  menu_order: number;
  object: 'page' | 'custom' | 'category' | string;
}

export interface Slider {
  id: number
  slug: string
  acf: {
    slides: Slide[]
    autoplay: boolean
    delay: string
  }
}

export type SlideType = 'hero' | 'corporate' | 'product' | 'service'

export interface Slide {
  image?: {
    url: string
    alt?: string
  }
  title?: string
  subtitle?: string
  slide_type?: SlideType
  cta?: {
    link: string
    cta_name: string
  }[]
}

export interface AppMenuItem {
  id: number;
  label: string;
  url: string;
  children?: AppMenuItem[];
}

// Content types
export interface Post extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  sticky: boolean;
  template: string;
  format:
  | "standard"
  | "aside"
  | "chat"
  | "gallery"
  | "link"
  | "image"
  | "quote"
  | "status"
  | "video"
  | "audio";
  categories: number[];
  tags: number[];
  meta: Record<string, unknown>;
}

export interface HeroStatic {
  background_image?: {
    url: string
    alt?: string
  } | false
  description?: {
    content_position?: 'left' | 'center' | 'right'
    title?: string
    subtitle?: string
  }
  cta?: {
    link: string
    cta_name: string
  }[] | false
}

export interface ServicesSection {
  acf_fc_layout: 'services'
  title?: string
  description?: string
  services: number[]
  cta?: {
    label: string
    link: string
  }[]
}

export interface ProjectsSection {
  acf_fc_layout: 'projects'
  title?: string
  description?: string
  projects: number[]
  cta?: {
    label: string
    link: string
  }[]
}

export interface TestimonialsSection {
  acf_fc_layout: 'testimonials'
  title?: string
  description?: string
  testimonials: number[]
}

export interface FaqsSection {
  acf_fc_layout: 'faqs'
  title?: string
  description?: string
  faqs: number[]
}

export interface TeamSection {
  acf_fc_layout: 'team'
  title?: string
  description?: string
  team_members: number[]
}

export interface ContactSection {
  acf_fc_layout: 'contact'
  title?: string
  description?: string
  contact_us: number
}

export type PageSection =
  | ServicesSection
  | ProjectsSection
  | TestimonialsSection
  | FaqsSection
  | TeamSection
  | ContactSection

export interface DefaultTemplateACF {
  hero?: {
    hero_type?: 'slider' | 'static'
    hero_slider?: number | false
    hero_static?: HeroStatic
  }
  page_sections?: PageSection[]
}

export interface DocumentationTemplateACF {
  content?: string
}

export interface PageACF {
  page_template: 'default' | 'documentation' | string
  default?: DefaultTemplateACF
  documentation?: DocumentationTemplateACF
}

export interface Page extends WPEntity {
  title: RenderedTitle
  content: RenderedContent
  excerpt: RenderedContent
  author: number
  featured_media: number
  parent: number
  menu_order: number
  comment_status: "open" | "closed"
  ping_status: "open" | "closed"
  template: string
  meta: Record<string, unknown>
  acf?: PageACF
}

// Taxonomy types
interface Taxonomy {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  meta: Record<string, unknown>;
}

export interface Category extends Taxonomy {
  taxonomy: "category";
  parent: number;
}

export interface Tag extends Taxonomy {
  taxonomy: "post_tag";
}

export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<string, string>;
  meta: Record<string, unknown>;
}

// Block types
interface BlockSupports {
  align?: boolean | string[];
  anchor?: boolean;
  className?: boolean;
  color?: {
    background?: boolean;
    gradients?: boolean;
    text?: boolean;
  };
  spacing?: {
    margin?: boolean;
    padding?: boolean;
  };
  typography?: {
    fontSize?: boolean;
    lineHeight?: boolean;
  };
  [key: string]: unknown;
}

interface BlockStyle {
  name: string;
  label: string;
  isDefault: boolean;
}

export interface BlockType {
  api_version: number;
  title: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  parent: string[];
  supports: BlockSupports;
  styles: BlockStyle[];
  textdomain: string;
  example: Record<string, unknown>;
  attributes: Record<string, unknown>;
  provides_context: Record<string, string>;
  uses_context: string[];
  editor_script: string;
  script: string;
  editor_style: string;
  style: string;
}

export interface EditorBlock {
  id: string;
  name: string;
  attributes: Record<string, unknown>;
  innerBlocks: EditorBlock[];
  innerHTML: string;
  innerContent: string[];
}

export interface TemplatePart {
  id: string;
  slug: string;
  theme: string;
  type: string;
  source: string;
  origin: string;
  content: string | EditorBlock[];
  title: {
    raw: string;
    rendered: string;
  };
  description: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  wp_id: number;
  has_theme_file: boolean;
  author: number;
  area: string;
}

export interface SearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  _links: {
    self: Array<{
      embeddable: boolean;
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
  };
}

// Component Props Types
export interface FilterBarProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: Author["id"];
  selectedTag?: Tag["id"];
  selectedCategory?: Category["id"];
  onAuthorChange?: (authorId: Author["id"] | undefined) => void;
  onTagChange?: (tagId: Tag["id"] | undefined) => void;
  onCategoryChange?: (categoryId: Category["id"] | undefined) => void;
}
