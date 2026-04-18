import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { LazyTranslateLoaderService } from './lazy-translate-loader.service';

/**
 * Route resolver that lazily loads a translation scope before the route
 * activates. The scope name is read from `route.data['translateScope']`
 * (string or string[]).
 *
 * @example
 * ```ts
 * {
 *   path: 'desarrollo-software-peru',
 *   loadComponent: () => import('./pages/...').then(m => m.MyComponent),
 *   resolve: { i18nScope: translateScopeResolver },
 *   data: { translateScope: 'landings' }
 * }
 *
 * // Multiple scopes
 * data: { translateScope: ['landings', 'faq'] }
 * ```
 */
export const translateScopeResolver: ResolveFn<boolean> = async (
  route: ActivatedRouteSnapshot,
) => {
  const loader = inject(LazyTranslateLoaderService);
  const scope = route.data['translateScope'] as string | string[] | undefined;

  if (!scope) {
    return true;
  }

  const scopes = Array.isArray(scope) ? scope : [scope];
  await loader.loadScopes(scopes);

  return true;
};
