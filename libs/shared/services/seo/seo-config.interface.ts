export interface SeoConfig {
  /** Browser tab title */
  title: string;
  /** <meta name="description"> — also used as og:description if ogDescription is not supplied */
  description?: string;
  /** og:title — defaults to title when omitted */
  ogTitle?: string;
  /** og:description — defaults to description when omitted */
  ogDescription?: string;
  /** og:image absolute URL */
  ogImage?: string;
  /** og:url canonical page URL */
  ogUrl?: string;
  /** twitter:title — defaults to ogTitle when omitted */
  twitterTitle?: string;
  /** twitter:description — defaults to ogDescription when omitted */
  twitterDescription?: string;
  /** twitter:image absolute URL — defaults to ogImage */
  twitterImage?: string;
  /** Allow search-engine indexing. Pass false to emit noindex,nofollow. Default: true */
  index?: boolean;
  /** hreflang alternate links, e.g. [{ hreflang: 'es', href: 'https://alaz.pe/desarrollo-de-apps' }, { hreflang: 'en', href: 'https://alaz.pe/app-development' }] */
  alternates?: { hreflang: string; href: string }[];
}
