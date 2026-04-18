import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface TrafficSource {
  source: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  details?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class TrafficSourceService {
  /**
   * Returns the detected traffic source based on referrer, UTM params, and heuristics
   */
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'trafficSource';

  /**
   * Detect and persist traffic source on first call (browser only)
   */
  detectAndStoreTrafficSource(): TrafficSource {
    if (!isPlatformBrowser(this.platformId)) return { source: 'unknown' };
    const stored = this.getStoredTrafficSource();
    if (stored) return stored;

    const urlParams = new URLSearchParams(window.location.search);
    const referrer = this.document.referrer || '';
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    const source = this.detectSource(utmSource, referrer);

    const traffic: TrafficSource = {
      source,
      medium: utmMedium || undefined,
      campaign: utmCampaign || undefined,
      referrer: referrer || undefined,
      details: {
        utmSource,
        utmMedium,
        utmCampaign,
      },
    };
    try {
      window.sessionStorage.setItem(this.storageKey, JSON.stringify(traffic));
    } catch {
      // Ignore storage errors (SSR or private mode)
    }
    return traffic;
  }

  /**
   * Detects the traffic source from UTM or referrer
   */
  private detectSource(utmSource: string | null, referrer: string): string {
    if (utmSource) return utmSource;
    if (!referrer) return 'direct';
    const sourceMatchers: { [key: string]: RegExp } = {
      google: /google\./i,
      facebook: /facebook\./i,
      fb: /fb\.com/i,
      instagram: /instagram\./i,
      tiktok: /tiktok\./i,
      bing: /bing\./i,
      yahoo: /yahoo\./i,
    };
    for (const [key, regex] of Object.entries(sourceMatchers)) {
      if (regex.test(referrer)) {
        // fb.com and facebook.com both map to facebook
        if (key === 'fb') return 'facebook';
        return key;
      }
    }
    return 'referral';
  }

  /**
   * Get traffic source from sessionStorage (browser only)
   */
  getStoredTrafficSource(): TrafficSource | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = window.sessionStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch {
      // Ignore storage errors (SSR or private mode)
    }
    return null;
  }
}
