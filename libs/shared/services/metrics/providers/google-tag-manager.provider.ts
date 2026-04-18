import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@alaz/utils';
import { BaseMetricProvider } from '../interfaces/metric-provider.interface';
import { EventData, UserData, MetricProviderConfig, MetricProviderType } from '../types/metric.types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    google_tag_manager?: unknown;
  }
}

interface GoogleTagManagerFunction {
  (...args: unknown[]): void;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleTagManagerProvider extends BaseMetricProvider {
  readonly name = MetricProviderType.GOOGLE_TAG_MANAGER;

  private readonly scriptLoader = inject(DynamicScriptLoaderService);
  private readonly platformId = inject(PLATFORM_ID);

  // Type the core property specifically for GTM
  declare core: GoogleTagManagerFunction | null;

  protected doInitialize(config: MetricProviderConfig): Observable<boolean> {
    return new Observable(subscriber => {
      if (!config.apiKey) {
        console.error('Google Tag Manager: Container ID is required');
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      try {
        // Initialize dataLayer if not exists
        window.dataLayer = window.dataLayer || [];

        // Create GTM push function
        const gtmPush = (...args: unknown[]) => {
          window.dataLayer?.push(args[0]);
        };

        this.core = gtmPush;

        // Use script loader to inject GTM inline script
        const gtmInlineScript = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${config.apiKey}');
        `;

        this.scriptLoader.injectInlineScript(
          gtmInlineScript,
          'google-tag-manager',
          { appendTo: 'head' }
        ).subscribe({
          next: (success: boolean) => {
            if (success) {
              // Add noscript fallback
              if (config.apiKey) {
                this.addNoScriptFallback(config.apiKey);
              }

              // GTM doesn't have a reliable load event, so we'll set ready after a short delay
              setTimeout(() => {
                this.setReady(true);
                subscriber.next(true);
                subscriber.complete();
              }, 1000);
            } else {
              console.error('Google Tag Manager: Failed to inject script');
              subscriber.next(false);
              subscriber.complete();
            }
          },
          error: (error: unknown) => {
            console.error('Google Tag Manager: Script injection error:', error);
            subscriber.next(false);
            subscriber.complete();
          }
        });

      } catch (error) {
        console.error('Google Tag Manager initialization error:', error);
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  sendEvent(eventName: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      const eventData = {
        event: eventName,
        ...data
      };

      window.dataLayer?.push(eventData);
    } catch (error) {
      console.error('Google Tag Manager sendEvent error:', error);
    }
  }

  identifyUser(userData: UserData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      const userEvent = {
        event: 'user_identification',
        user_id: userData.id.toString(),
        user_properties: userData.properties || {}
      };

      window.dataLayer?.push(userEvent);
    } catch (error) {
      console.error('Google Tag Manager identifyUser error:', error);
    }
  }

  resetUser(): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      window.dataLayer?.push({
        event: 'user_reset',
        user_id: undefined
      });
    } catch (error) {
      console.error('Google Tag Manager resetUser error:', error);
    }
  }

  trackPageView(url: string, title?: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      window.dataLayer?.push({
        event: 'page_view',
        page_location: url,
        page_title: title,
        ...data
      });
    } catch (error) {
      console.error('Google Tag Manager trackPageView error:', error);
    }
  }

  trackConversion(eventName: string, value?: number, currency?: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      window.dataLayer?.push({
        event: 'conversion',
        conversion_name: eventName,
        value,
        currency: currency || 'USD',
        ...data
      });
    } catch (error) {
      console.error('Google Tag Manager trackConversion error:', error);
    }
  }

  override trackLead(value?: number, currency?: string, data?: EventData): void {
    this.trackConversion('generate_lead', value, currency, data);
  }

  /**
   * Push custom data to GTM dataLayer
   */
  pushToDataLayer(data: Record<string, unknown>): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId)) return;

    try {
      window.dataLayer?.push(data);
    } catch (error) {
      console.error('Google Tag Manager pushToDataLayer error:', error);
    }
  }

  /**
   * Check if GTM is loaded
   */
  isGTMLoaded(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return typeof window.google_tag_manager !== 'undefined';
  }

  /**
   * Adds the noscript fallback for GTM
   */
  private addNoScriptFallback(containerId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Check if noscript already exists
      const existingNoscript = document.querySelector('noscript[data-gtm="true"]');
      if (existingNoscript) return;

      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-gtm', 'true');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    } catch (error) {
      console.error('Google Tag Manager: Failed to add noscript fallback:', error);
    }
  }
}
