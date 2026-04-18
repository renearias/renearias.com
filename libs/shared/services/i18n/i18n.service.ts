import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { firstValueFrom, Observable } from 'rxjs';

export type SupportedLocale = 'en' | 'es';
const LANG_STORAGE_KEY = 'alaz_app_lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly fallback: SupportedLocale = 'en';
  private readonly supported: SupportedLocale[] = ['en', 'es'];

  private readonly translate = inject(TranslateService);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.translate.addLangs(this.supported);
    this.translate.setDefaultLang(this.fallback);
  }

  get currentLang(): SupportedLocale {
    const current = this.translate.currentLang || this.translate.defaultLang;
    return this.isSupported(current) ? current : this.fallback;
  }

  get onLangChange(): Observable<LangChangeEvent> {
    return this.translate.onLangChange;
  }

  detectLocale(
    url?: string,
    acceptLanguage?: string,
    navigatorLang?: string,
  ): SupportedLocale {
    const fromStorage = this.fromStorage();
    const fromQuery = this.fromQueryParams(url);
    const fromPath = this.fromUrlPath(url);
    const fromHeader = this.fromAcceptLanguage(acceptLanguage);
    const fromNav = this.normalize(navigatorLang);

    return (
      fromQuery ||
      fromPath ||
      fromStorage ||
      fromHeader ||
      fromNav ||
      this.fallback
    );
  }

  async use(locale: SupportedLocale, titleKey?: string): Promise<void> {
    const lang = this.isSupported(locale) ? locale : this.fallback;
    await firstValueFrom(this.translate.use(lang));
    this.setHtmlLang(lang);
    this.saveToStorage(lang);
    if (titleKey) {
      const translated = await firstValueFrom(this.translate.get(titleKey));
      if (translated) this.title.setTitle(translated);
    }
  }

  isLanguageSupported(language?: string | null): language is SupportedLocale {
    return this.isSupported(language);
  }

  private setHtmlLang(locale: SupportedLocale) {
    if (!this.isBrowser) return;
    try {
      this.document?.documentElement?.setAttribute('lang', locale);
    } catch {
      // ignore
    }
  }

  private saveToStorage(locale: SupportedLocale) {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }

  private fromStorage(): SupportedLocale | null {
    if (!this.isBrowser) return null;
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      return this.normalize(stored);
    } catch {
      return null;
    }
  }

  private isSupported(l?: string | null): l is SupportedLocale {
    return !!l && (this.supported as string[]).includes(l);
  }

  private normalize(l?: string | null): SupportedLocale | null {
    if (!l) return null;
    const s = l.toLowerCase();
    if (s.startsWith('en')) return 'en';
    if (s.startsWith('es')) return 'es';
    return null;
  }

  private fromQueryParams(url?: string): SupportedLocale | null {
    if (!url) return null;
    try {
      const u = url.startsWith('http')
        ? new URL(url)
        : new URL(url, 'http://localhost');
      const langParams = ['l', 'lang', 'locale', 'language'];
      for (const param of langParams) {
        const value = u.searchParams.get(param);
        if (value) {
          const normalized = this.normalize(value);
          if (normalized) return normalized;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  private fromUrlPath(url?: string): SupportedLocale | null {
    if (!url) return null;
    try {
      const u = url.startsWith('http')
        ? new URL(url)
        : new URL(url, 'http://localhost');
      const [first] = u.pathname.split('/').filter(Boolean);
      return this.normalize(first);
    } catch {
      return null;
    }
  }

  private fromAcceptLanguage(header?: string): SupportedLocale | null {
    if (!header) return null;
    const parts = header.split(',').map((p) => p.trim());
    for (const p of parts) {
      const [tag] = p.split(';');
      const loc = this.normalize(tag);
      if (loc) return loc;
    }
    return null;
  }
}
