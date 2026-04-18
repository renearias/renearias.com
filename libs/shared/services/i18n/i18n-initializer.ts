import { inject, provideAppInitializer } from '@angular/core';
import { LocationService } from '../location/location.service';
import { RequestContextService } from '../request/request-context.service';
import { I18nService } from './i18n.service';

/**
 * Provides an app initializer that automatically detects and sets the language
 * based on URL, Accept-Language header (SSR), or navigator language (client).
 * Also sets the document title from the specified translation key.
 *
 * Updated to use LocationService for URL retrieval and platform detection,
 * providing a more modern and maintainable approach.
 */
export function provideI18nInitializer(titleKey = 'app.title') {
  return provideAppInitializer(() => {
    const i18n = inject(I18nService);
    const locationService = inject(LocationService);

    // Use the RequestContextService to get request information
    const requestContext = inject(RequestContextService);
    const requestInfo = requestContext.getRequestInfo();

    // Extract URL using LocationService
    const url = locationService.currentUrl;
    // Extract Accept-Language header using LocationService and fallback
    let acceptLanguage: string | undefined;

    // Get accept-language from server environment
    if (locationService.isServer()) {
      if (requestInfo?.headers?.['accept-language']) {
        acceptLanguage = requestInfo.headers['accept-language'];
      }
    }

    // Get navigator language (client-side only)
    const navigatorLang = !locationService.isServer() ? navigator.language : undefined;
    const locale = i18n.detectLocale(url, acceptLanguage, navigatorLang);

    return i18n.use(locale, titleKey);
  });
}
