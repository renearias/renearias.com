import { InjectionToken } from '@angular/core';

/** Base URL of the site (e.g. https://renearias.com). Set server-side via process.env['BASE_URL'] and transferred to the client via TransferState. */
export const SEO_BASE_URL = new InjectionToken<string>('SEO_BASE_URL', {
  factory: () => 'https://renearias.com',
});

export const SEO_BASE_URL_STATE_KEY_NAME = 'seoBaseUrl';
