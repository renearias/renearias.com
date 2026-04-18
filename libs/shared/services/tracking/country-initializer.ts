import { inject, provideAppInitializer } from '@angular/core';
import { CountryDetectionService } from './country-detection.service';

/**
 * Provides an app initializer that detects the visitor's country from the
 * Cloudflare `CF-IPCountry` request header (SSR) and makes it available
 * client-side via `CountryDetectionService.country`.
 *
 * Add to your `ApplicationConfig.providers` array:
 * ```ts
 * provideCountryInitializer()
 * ```
 */
export function provideCountryInitializer() {
  return provideAppInitializer(() => {
    const countryService = inject(CountryDetectionService);
    countryService.detect();
  });
}
