import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@alaz/utils';
import { BaseMetricProvider } from '../interfaces/metric-provider.interface';
import { EventData, UserData, MetricProviderConfig, MetricProviderType } from '../types/metric.types';

declare global {
  interface Window {
    gtag?: GoogleAnalyticsFunction;
    dataLayer?: unknown[];
  }
}

interface GoogleAnalyticsFunction {
  (...args: unknown[]): void;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsProvider extends BaseMetricProvider {
  readonly name = MetricProviderType.GOOGLE_ANALYTICS;

  private readonly scriptLoader = inject(DynamicScriptLoaderService);
  private readonly platformId = inject(PLATFORM_ID);

  // Type the core property specifically for Google Analytics
  declare core: GoogleAnalyticsFunction | null;

  protected doInitialize(config: MetricProviderConfig): Observable<boolean> {
    return new Observable(subscriber => {
      if (!config.apiKey) {
        console.error('Google Analytics: API Key is required');
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      // Check if we're in SSR
      if (isPlatformServer(this.platformId)) {
        // In SSR, inject the gtag stub and load the script
        this.injectGtagStubScript().subscribe({
          next: (stubSuccess: boolean) => {
            if (stubSuccess) {
              // Load the GA script
              this.scriptLoader.loadScript(
                `https://www.googletagmanager.com/gtag/js?id=${config.apiKey}`,
                'google-analytics',
                undefined,
                { async: true, appendTo: 'head' }
              ).subscribe({
                next: (scriptSuccess: boolean) => {
                  subscriber.next(scriptSuccess);
                  subscriber.complete();
                },
                error: (error: unknown) => {
                  console.error('Google Analytics: SSR script loading error:', error);
                  subscriber.next(false);
                  subscriber.complete();
                }
              });
            } else {
              console.error('Google Analytics: Failed to inject stub script in SSR');
              subscriber.next(false);
              subscriber.complete();
            }
          },
          error: (error: unknown) => {
            console.error('Google Analytics: SSR stub injection error:', error);
            subscriber.next(false);
            subscriber.complete();
          }
        });
        return;
      }

      try {
        if (!window.gtag) {
          this.initializeGoogleAnalyticsInBrowser(config, subscriber);
        } else {
          // Already loaded, but always initialize
          this.initializeGoogleAnalytics(config, subscriber);
        }
      } catch (error) {
        console.error('Google Analytics initialization error:', error);
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  sendEvent(eventName: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      this.core('event', eventName, data || {});
    } catch (error) {
      console.error('Google Analytics sendEvent error:', error);
    }
  }

  identifyUser(userData: UserData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      this.core('config', this.config?.apiKey, {
        user_id: userData.id.toString(),
        custom_map: userData.properties || {}
      });
    } catch (error) {
      console.error('Google Analytics identifyUser error:', error);
    }
  }

  resetUser(): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      this.core('config', this.config?.apiKey, {
        user_id: undefined
      });
    } catch (error) {
      console.error('Google Analytics resetUser error:', error);
    }
  }

  trackPageView(url: string, title?: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      // Send page_view event (the correct way to track page views in GA4)
      this.core('event', 'page_view', {
        page_location: url,
        page_title: title,
        ...data
      });
    } catch (error) {
      console.error('Google Analytics trackPageView error:', error);
    }
  }

  trackConversion(eventName: string, value?: number, currency?: string, data?: EventData): void {
    if (!this.isReady() || !isPlatformBrowser(this.platformId) || !this.core) return;

    try {
      this.core('event', eventName, {
        value,
        currency: currency || 'USD',
        ...data
      });
    } catch (error) {
      console.error('Google Analytics trackConversion error:', error);
    }
  }

  override trackLead(value?: number, currency?: string, data?: EventData): void {
    this.trackConversion('generate_lead', value, currency, data);
  }

  /**
   * Handles Google Analytics initialization in browser when gtag doesn't exist
   */
  private initializeGoogleAnalyticsInBrowser(
    config: MetricProviderConfig,
    subscriber: { next: (value: boolean) => void; complete: () => void }
  ): void {
    // First inject the gtag stub as inline script
    this.injectGtagStubScript().subscribe({
      next: (stubSuccess: boolean) => {
        if (stubSuccess) {
          // Then load the official script
          this.scriptLoader.loadScript(
            `https://www.googletagmanager.com/gtag/js?id=${config.apiKey}`,
            'google-analytics',
            () => {
              // Once loaded, always initialize
              this.initializeGoogleAnalytics(config, subscriber);
            },
            { async: true, appendTo: 'head' }
          ).subscribe({
            next: (scriptSuccess: boolean) => {
              if (!scriptSuccess) {
                console.error('Google Analytics: Failed to load script');
                subscriber.next(false);
                subscriber.complete();
              }
            },
            error: (error: unknown) => {
              console.error('Google Analytics: Script loading error:', error);
              subscriber.next(false);
              subscriber.complete();
            }
          });
        } else {
          console.error('Google Analytics: Failed to inject stub script');
          subscriber.next(false);
          subscriber.complete();
        }
      },
      error: (error: unknown) => {
        console.error('Google Analytics: Stub injection error:', error);
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  /**
   * Initializes Google Analytics with the provided configuration
   */
  private initializeGoogleAnalytics(
    config: MetricProviderConfig,
    subscriber: { next: (value: boolean) => void; complete: () => void }
  ): void {
    try {
      if (window.gtag && config.apiKey) {
        // Assign the core object when available
        this.core = window.gtag;

        // Configure GA
        this.core('js', new Date());
        this.core('config', config.apiKey, config.options || {});

        // Configure Google Ads if present in options
        const googleAdsConfig = config.options?.['google_ads_config'] as {
          conversionId?: string;
          conversionLabel?: string;
          [key: string]: unknown
        } | undefined;

        if (googleAdsConfig?.conversionId) {
          this.core('config', googleAdsConfig.conversionId, {
            allow_enhanced_conversions: true,
            ...googleAdsConfig
          });
        }

        this.setReady(true);
        subscriber.next(true);
        subscriber.complete();
      } else {
        console.error('Google Analytics: gtag not available or missing API key');
        subscriber.next(false);
        subscriber.complete();
      }
    } catch (error) {
      console.error('Google Analytics: Initialization error:', error);
      subscriber.next(false);
      subscriber.complete();
    }
  }

  /**
   * Injects the gtag stub function as an inline script
   */
  private injectGtagStubScript(): Observable<boolean> {
    const stubCode = `
      (function() {
        // Check if gtag and dataLayer already exist
        if (typeof window !== 'undefined' && window.gtag) return;

        // Initialize dataLayer if not exists
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
        }

        // Create the gtag stub function
        function gtag() {
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push(arguments);
          }
        }

        // Attach to window
        if (typeof window !== 'undefined') {
          window.gtag = gtag;
        }
      })();
    `;

    return this.scriptLoader.injectInlineScript(
      stubCode,
      'google-analytics-stub',
      { appendTo: 'head' }
    );
  }
}
