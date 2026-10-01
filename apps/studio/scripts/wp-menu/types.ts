/** Shapes returned by the kneaders/v1 WordPress REST API. */

export interface WpTerm {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
}

export interface WpMenuCategory {
  menu_category: WpTerm;
  image_url: string;
}

export interface WpMenuPage {
  select_menu_cat: WpMenuCategory[];
}

export interface WpYoast {
  yoast_wpseo_focuskw: string;
  yoast_wpseo_title: string;
  yoast_wpseo_metadesc: string;
  yoast_wpseo_linkdex: string;
  yoast_wpseo_metakeywords: string;
  yoast_wpseo_meta_robots_noindex: string;
  yoast_wpseo_meta_robots_nofollow: string;
  yoast_wpseo_meta_robots_adv: string;
  yoast_wpseo_canonical: string;
  yoast_wpseo_redirect: string;
  yoast_wpseo_opengraph_title: string;
  yoast_wpseo_opengraph_description: string;
  yoast_wpseo_opengraph_image: string;
  yoast_wpseo_twitter_title: string;
  yoast_wpseo_twitter_description: string;
  yoast_wpseo_twitter_image: string;
}

export interface WpMenuItem {
  title: string;
  slug: string;
  group: {
    menu_item_description: string;
    menu_item_mainimage: string;
    menu_item_url: string;
  };
  SEO: WpYoast;
  order: number;
  hero: { title: string; sub_title: string; hero_image: string };
}

export interface WpMenuItemsResponse {
  total: number;
  rows: WpMenuItem[];
}

export interface WpMenuSnapshot {
  fetchedAt: string;
  source: string;
  categories: WpMenuCategory[];
  /** Category slug → rows, in the order the API (and kneaders.com) lists them. */
  items: Record<string, WpMenuItem[]>;
}
