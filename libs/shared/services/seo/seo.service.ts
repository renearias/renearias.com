import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoConfig } from './seo-config.interface';
import { SEO_BASE_URL } from './seo.tokens';

const DEFAULT_OG_IMAGE_PATH = '/images/rene-arias-logo.png';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly baseUrl = inject(SEO_BASE_URL);

  private resolveUrl(path: string): string {
    if (!path) return path;
    return path.startsWith('/') ? this.baseUrl + path : path;
  }

  update(config: SeoConfig): void {
    const {
      title,
      description,
      ogTitle = title,
      ogDescription = description,
      ogImage = DEFAULT_OG_IMAGE_PATH,
      ogUrl,
      twitterTitle = ogTitle,
      twitterDescription = ogDescription,
      twitterImage = ogImage,
      index = true,
    } = config;

    this.titleService.setTitle(title);

    this.metaService.updateTag({
      name: 'robots',
      content: index ? 'index, follow' : 'noindex, nofollow',
    });

    if (description) {
      this.metaService.updateTag({ name: 'description', content: description });
    }

    this.metaService.updateTag({ property: 'og:title', content: ogTitle });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    if (ogDescription) {
      this.metaService.updateTag({
        property: 'og:description',
        content: ogDescription,
      });
    }
    this.metaService.updateTag({ property: 'og:image', content: this.resolveUrl(ogImage) });
    if (ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: ogUrl });
      this.updateCanonicalUrl(ogUrl);
    }

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: twitterTitle });
    if (twitterDescription) {
      this.metaService.updateTag({
        name: 'twitter:description',
        content: twitterDescription,
      });
    }
    this.metaService.updateTag({ name: 'twitter:image', content: this.resolveUrl(twitterImage) });
    this.updateHreflangLinks(config.alternates ?? []);
  }

  private updateHreflangLinks(alternates: { hreflang: string; href: string }[]): void {
    const head = this.document.getElementsByTagName('head')[0];
    // Remove any existing hreflang links
    this.document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    for (const { hreflang, href } of alternates) {
      const link = this.document.createElement('link') as HTMLLinkElement;
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      head.appendChild(link);
    }
  }

  updateCanonicalUrl(url: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null =
      this.document.querySelector(`link[rel='canonical']`) || null;
    if (!element) {
      element = this.document.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    element.setAttribute('href', url);
  }
}
