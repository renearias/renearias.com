import { Injectable, inject, makeStateKey, TransferState, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestContextService } from '../request/request-context.service';

const COUNTRY_STATE_KEY = makeStateKey<string | null>('cf_country');

/**
 * Detects the visitor's country using the Cloudflare `CF-IPCountry` request header (SSR)
 * and transfers the value to the client via Angular's TransferState.
 *
 * Usage: inject `CountryDetectionService` and read `country` after the initializer runs.
 */
@Injectable({ providedIn: 'root' })
export class CountryDetectionService {
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly requestContext = inject(RequestContextService);

  private _country: string | null = null;

  /** ISO 3166-1 alpha-2 country code, e.g. `'MX'`, `'US'`. `null` when unknown. */
  get country(): string | null {
    return this._country;
  }

  /**
   * Detects the country and stores the result.
   * - On the **server**: reads `CF-IPCountry` from the Cloudflare request header and
   *   seeds `TransferState` so the value survives hydration.
   * - On the **client**: reads from `TransferState` (populated by SSR) and falls back to
   *   `null` if no value was transferred.
   */
  detect(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._country = this.transferState.get(COUNTRY_STATE_KEY, null);
    } else {
      const requestInfo = this.requestContext.getRequestInfo();
      const cfCountry =
        requestInfo?.headers?.['cf-ipcountry'] ?? null;

      // Normalise: Cloudflare sends 'XX' when unknown
      this._country = cfCountry && cfCountry !== 'XX' ? cfCountry.toUpperCase() : null;

      // Transfer the value to the client
      this.transferState.set(COUNTRY_STATE_KEY, this._country);
    }
  }
}
