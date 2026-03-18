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

export interface MediaSize {
  file: string;
  width: number;
  height: number;
  "mime-type": string;
  filesize: number;
}

export interface SiteInfo {
  title: string;
  description: string;
  logo: {
    id: number;
    url: string;
    alt: string;
    sizes: Record<string, MediaSize>;
    mime: string;
  };
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
    bg_photo_desktop: string
    bg_photo_mobile: string
  }
}

export interface ActivoEstrategico {
  id: number
  slug: string
  acf: {
    title: string
    amount: string
    description: string
  }
}

export interface OurValues {
  id: number
  slug: string
  acf: {
    title: string
    description: string
  }
}

export interface Projects {
  id: number
  slug: string
  acf: {
    photos: {
      primary_mux_playback_web_id: string
      primary_mux_playback_mobile_id: string
      secondary_mux_playback_web_id: string
    }
    project: {
      highlight: string
      title: string
      description: string
      details: string
      cta: string
      cta_url: string
    }
  }
}

export interface Timeline {
  id: number
  slug: string
  acf: {
    year: string
    title: string
    description: string
  }
}

export interface Investment {
  id: number
  slug: string
  acf: {
    highlight: string
    title: string
    description: string
  }
}

export interface Faq {
  id: number
  slug: string
  title: {
    rendered: string
  }
  acf: {
    content: string
  }
}

export interface Biography {
  id: number
  slug: string
  acf: {
    main_photo?: string
    first_text?: string
    second_text?: string
    biography: {
      highlight: string
      name: string
      role: string
      title: string
      description: string
      cta: string
      mux_playback_id?: string
      signature: string
    }
  }
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

export interface AboutSection {
  acf_fc_layout: 'about'
  title?: string
  subtitle?: string
  mux_playback_id?: string
  mux_playback_mobile_id?: string
  background_desktop?: string
  background_mobile?: string
}

export interface OurValuesSection {
  acf_fc_layout: 'our_values'
  highlight?: string
  title?: string
  description?: string
  our_values: number[]
}

export interface TimelineSection {
  acf_fc_layout: 'timelines'
  highlight: string
  description: string
  subtitle: string
  timelines: number[]
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

export interface InvestmentsSection {
  acf_fc_layout: 'investment'
  main_photo?: string
  secondary_photo?: string
  highlight?: string
  title?: string
  description?: string
  investment: number[]
  cta?: string
  cta_url?: string
}

export interface ActivosEstrategicosSection {
  acf_fc_layout: "activos";
  title?: string;
  description?: string;
  activos: number[];
}

export interface BiographySection {
  acf_fc_layout: 'biography'
  highlight?: string
  short_description?: string
  description?: string
  biography: { ID: number }[]
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
  mail: string | undefined;
  phone: string | undefined;
  subtitle: string | undefined;
  highlight: string | undefined;
  title: string | undefined;
  instagram: string | undefined;
  facebook: string | undefined;
  x: string | undefined;
  linkedin: string | undefined;
}

export type PageSection =
  | BiographySection
  | AboutSection
  | OurValuesSection
  | ActivosEstrategicosSection
  | TimelineSection
  | ProjectsSection
  | InvestmentSection
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
