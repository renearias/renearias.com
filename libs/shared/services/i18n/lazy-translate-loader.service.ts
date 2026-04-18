import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService, TranslationObject } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

/**
 * Service for progressively loading translation scopes on demand.
 *
 * Instead of loading every translation key at startup via the main `{lang}.json`,
 * this service fetches scoped JSON files (e.g. `/i18n/scopes/landings.es.json`)
 * and **merges** them into the active translation store.
 *
 * Loaded scopes are cached per `scope+lang` key, so re-visiting a route that
 * requires the same scope will not trigger another HTTP request.
 *
 * When the language changes, previously loaded scopes are automatically
 * re-fetched for the new language.
 *
 * @example
 * ```ts
 * // Load a scope imperatively
 * await lazyLoader.loadScope('landings');
 *
 * // Or use the translateScopeResolver in routes
 * { path: 'mi-ruta', resolve: { i18n: translateScopeResolver }, data: { translateScope: 'landings' } }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LazyTranslateLoaderService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  /** Set of `scope::lang` keys that have already been loaded. */
  private readonly loaded = new Set<string>();

  /** Track which scopes have ever been requested, for re-loading on lang change. */
  private readonly knownScopes = new Set<string>();

  /** Base path where scoped translation files live. */
  private readonly basePath = '/i18n/scopes/';

  constructor() {
    // When the language changes, re-load all known scopes for the new language.
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const newLang = event.lang;
        for (const scope of this.knownScopes) {
          const cacheKey = `${scope}::${newLang}`;
          if (!this.loaded.has(cacheKey)) {
            void this.loadScopeForLang(scope, newLang);
          }
        }
      });
  }

  /**
   * Load a translation scope for the current language and merge it into
   * the active `TranslateService` store.
   *
   * File naming convention: `{basePath}{scope}.{lang}.json`
   * e.g. `/i18n/scopes/landings.es.json`
   *
   * @param scope - The scope identifier (file prefix).
   * @returns Promise that resolves when translations have been merged.
   */
  async loadScope(scope: string): Promise<void> {
    const lang =
      this.translate.currentLang || this.translate.defaultLang || 'en';
    this.knownScopes.add(scope);
    return this.loadScopeForLang(scope, lang);
  }

  /**
   * Load multiple scopes at once.
   */
  async loadScopes(scopes: string[]): Promise<void> {
    await Promise.all(scopes.map((s) => this.loadScope(s)));
  }

  /**
   * Check whether a scope has been loaded for the current language.
   */
  isScopeLoaded(scope: string): boolean {
    const lang =
      this.translate.currentLang || this.translate.defaultLang || 'en';
    return this.loaded.has(`${scope}::${lang}`);
  }

  /**
   * Invalidate a cached scope so the next call to `loadScope` re-fetches it.
   * Useful after a language change.
   */
  invalidateScope(scope: string): void {
    for (const key of this.loaded) {
      if (key.startsWith(`${scope}::`)) {
        this.loaded.delete(key);
      }
    }
  }

  /**
   * Invalidate all cached scopes (e.g. after switching language).
   */
  invalidateAll(): void {
    this.loaded.clear();
  }

  // ── Internal ───────────────────────────────────────────
  private async loadScopeForLang(scope: string, lang: string): Promise<void> {
    const cacheKey = `${scope}::${lang}`;

    if (this.loaded.has(cacheKey)) {
      return;
    }

    const url = `${this.basePath}${scope}.${lang}.json`;

    try {
      const translations = await firstValueFrom(
        this.http.get<TranslationObject>(url),
      );
      this.translate.setTranslation(lang, translations, true);
      this.loaded.add(cacheKey);
    } catch (error) {
      console.warn(
        `[LazyTranslateLoader] Failed to load scope "${scope}" for lang "${lang}":`,
        error,
      );
    }
  }
}
