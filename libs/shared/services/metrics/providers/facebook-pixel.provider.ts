import { DynamicScriptLoaderService } from '@alaz/utils';
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMetricProvider } from '../interfaces/metric-provider.interface';
import {
  EventData,
  MetricProviderConfig,
  MetricProviderType,
  UserData,
} from '../types/metric.types';

/**
 * Facebook Pixel standard events that should use 'track' method
 * Custom events should use 'trackCustom' method
 */
const FACEBOOK_STANDARD_EVENTS = new Set([
  'PageView',
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent',
]);

declare global {
  interface Window {
    fbq?: FacebookPixelFunction;
    _fbq?: FacebookPixelFunction;
  }
}

interface FacebookPixelFunction {
  (...args: unknown[]): void;
  q?: unknown[][];
  push?: FacebookPixelFunction;
  loaded?: boolean;
  version?: string;
  callMethod?: (...args: unknown[]) => void;
}

@Injectable({
  providedIn: 'root',
})
export class FacebookPixelProvider extends BaseMetricProvider {
  readonly name = MetricProviderType.FACEBOOK_PIXEL;

  private readonly scriptLoader = inject(DynamicScriptLoaderService);
  private readonly platformId = inject(PLATFORM_ID);

  // Type the core property specifically for Facebook Pixel
  declare core: FacebookPixelFunction | null;

  protected doInitialize(config: MetricProviderConfig): Observable<boolean> {
    return new Observable((subscriber) => {
      if (!config.apiKey) {
        console.error('Facebook Pixel: API Key is required');
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      this.injectFacebookPixel().subscribe({
        next: (success: boolean) => {
          if (success) {
            if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && window.fbq) {
              this.core = window.fbq;
            }
            this.setReady(true);
            subscriber.next(true);
            subscriber.complete();
          } else {
            console.error('Facebook Pixel: Failed to inject script');
            subscriber.next(false);
            subscriber.complete();
          }
        },
        error: (error: unknown) => {
          console.error('Facebook Pixel: Script injection error:', error);
          subscriber.next(false);
          subscriber.complete();
        },
      });
    });
  }

  /**
   * Sends an event to Facebook Pixel.
   * Uses 'track' for standard Facebook events and 'trackCustom' for custom events.
   *
   * Standard Facebook events include: PageView, AddToCart, Purchase, Lead, etc.
   * Custom events are any events not in the Facebook standard events list.
   *
   * @param eventName - The name of the event to send
   * @param data - Optional event data to include with the event
   */
  trackPageView(url: string, title?: string): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core)
      return;

    try {
      this.core('track', 'PageView', { page_path: url, page_title: title });
    } catch (error) {
      console.error('Facebook Pixel trackPageView error:', error);
    }
  }

  sendEvent(eventName: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core)
      return;

    try {
      // Use 'track' for Facebook standard events, 'trackCustom' for custom events
      if (FACEBOOK_STANDARD_EVENTS.has(eventName)) {
        this.core('track', eventName, data || {});
      } else {
        this.core('trackCustom', eventName, data || {});
      }
    } catch (error) {
      console.error('Facebook Pixel sendEvent error:', error);
    }
  }

  identifyUser(userData: UserData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core)
      return;

    try {
      const identificationData = {
        em: userData.email ? this.hashEmail(userData.email) : undefined,
        external_id: userData.id.toString(),
        ...userData.properties,
      };

      this.core('init', this.config?.apiKey, identificationData);
    } catch (error) {
      console.error('Facebook Pixel identifyUser error:', error);
    }
  }

  resetUser(): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core)
      return;

    try {
      // Facebook Pixel doesn't have a direct reset method
      // Re-initialize without user data
      this.core('init', this.config?.apiKey, {});
    } catch (error) {
      console.error('Facebook Pixel resetUser error:', error);
    }
  }

  trackConversion(
    eventName: string,
    value?: number,
    currency?: string,
    data?: EventData,
  ): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core)
      return;

    try {
      // Use 'track' for Facebook standard events, 'trackCustom' for custom events
      const method = FACEBOOK_STANDARD_EVENTS.has(eventName) ? 'track' : 'trackCustom';
      this.core(method, eventName, {
        value,
        currency: currency || 'USD',
        ...data,
      });
    } catch (error) {
      console.error('Facebook Pixel trackConversion error:', error);
    }
  }

  override trackLead(value?: number, currency?: string, data?: EventData): void {
    this.trackConversion('Lead', value, currency, data);
  }

  private hashEmail(email: string): string {
    // Simple hash function for email (in production, use a proper hashing library)
    return btoa(email.toLowerCase().trim());
  }

  /**
   * Injects the Facebook Pixel stub function as an inline script
   * This works in both SSR and browser environments
   */
  private injectFacebookPixel(): Observable<boolean> {
    const pixelCode = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${this.config?.apiKey}');
    `;

    return this.scriptLoader.injectInlineScript(pixelCode, 'facebook-pixel', {
      appendTo: 'head',
    });
  }
}
