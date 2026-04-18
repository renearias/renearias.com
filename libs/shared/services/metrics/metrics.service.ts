import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { METRICS_CONFIG } from './config/metrics.config';
import { MetricProvider } from './interfaces/metric-provider.interface';
import { FacebookPixelProvider } from './providers/facebook-pixel.provider';
import { GoogleAnalyticsProvider } from './providers/google-analytics.provider';
import { GoogleTagManagerProvider } from './providers/google-tag-manager.provider';
import { HotjarProvider } from './providers/hotjar.provider';
import { MixpanelProvider } from './providers/mixpanel.provider';
import { EventData, MetricProviderType, UserData } from './types/metric.types';

/**
 * Factory for creating metric providers
 */
@Injectable({
  providedIn: 'root',
})
export class MetricProviderFactory {
  private readonly providerClasses = new Map<
    MetricProviderType,
    new () => MetricProvider
  >([
    [MetricProviderType.GOOGLE_ANALYTICS, GoogleAnalyticsProvider],
    [MetricProviderType.GOOGLE_TAG_MANAGER, GoogleTagManagerProvider],
    [MetricProviderType.FACEBOOK_PIXEL, FacebookPixelProvider],
    [MetricProviderType.HOTJAR, HotjarProvider],
    [MetricProviderType.MIXPANEL, MixpanelProvider],
    // Add more providers here as they are implemented
  ]);

  createProvider(type: MetricProviderType): MetricProvider | null {
    const ProviderClass = this.providerClasses.get(type);
    if (!ProviderClass) {
      console.warn(`Metric provider not found for type: ${type}`);
      return null;
    }
    return new ProviderClass();
  }

  getSupportedProviders(): MetricProviderType[] {
    return Array.from(this.providerClasses.keys());
  }

  registerProvider(
    type: MetricProviderType,
    providerClass: new () => MetricProvider,
  ): void {
    this.providerClasses.set(type, providerClass);
  }
}

/**
 * Main metrics service that manages all metric providers
 */
@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private readonly providers = new Map<MetricProviderType, MetricProvider>();
  private readonly readyProviders = new Set<MetricProviderType>();
  private readonly initializationSubject = new BehaviorSubject<boolean>(false);
  private globalProperties: Record<string, string | number | boolean> = {};
  private enableLogging = false;
  private enableErrorReporting = true;

  readonly isInitialized$ = this.initializationSubject.asObservable();

  private readonly factory = inject(MetricProviderFactory);
  private readonly config = inject(METRICS_CONFIG, { optional: true });

  constructor() {
    if (this.config) {
      this.initialize();
    }
  }

  /**
   * Initialize the metrics service with configuration
   */
  private initialize(): void {
    if (!this.config) {
      console.warn('MetricsService: No configuration provided');
      return;
    }

    this.enableLogging = this.config.enableLogging ?? false;
    this.enableErrorReporting = this.config.enableErrorReporting ?? true;
    this.globalProperties = this.config.globalProperties || {};

    const initObservables: Observable<boolean>[] = [];

    // Create and initialize providers
    Object.entries(this.config.providers).forEach(([type, providerConfig]) => {
      if (!providerConfig?.enabled) return;

      const provider = this.factory.createProvider(type as MetricProviderType);
      if (!provider) return;

      this.providers.set(type as MetricProviderType, provider);

      const initObservable = provider.initialize(providerConfig).pipe(
        tap((success) => {
          if (success) {
            this.readyProviders.add(type as MetricProviderType);
            this.log(`Provider ${type} initialized successfully`);
          } else {
            this.logError(`Provider ${type} initialization failed`);
          }
        }),
        catchError((error) => {
          this.logError(`Provider ${type} initialization error:`, error);
          return of(false);
        }),
      );

      initObservables.push(initObservable);
    });

    // Wait for all providers to initialize
    if (initObservables.length > 0) {
      forkJoin(initObservables)
        .pipe(map((results) => results.some((result) => result)))
        .subscribe((hasAnySuccess) => {
          this.initializationSubject.next(hasAnySuccess);
          this.log(
            `Metrics service initialized. Ready providers: ${this.readyProviders.size}`,
          );
        });
    } else {
      this.initializationSubject.next(true);
      this.log('Metrics service initialized with no providers');
    }
  }

  /**
   * Send an event to all active providers
   */
  sendEvent(eventName: string, data?: EventData): void {
    if (!this.isReady()) return;

    const eventData = { ...this.globalProperties, ...data };
    this.log(`Sending event: ${eventName}`, eventData);

    this.executeOnProviders((provider) => {
      provider.sendEvent(eventName, eventData);
    });
  }

  /**
   * Identify a user across all providers
   */
  identifyUser(userData: UserData): void {
    if (!this.isReady()) return;

    this.log(`Identifying user: ${userData.id}`, userData);

    this.executeOnProviders((provider) => {
      provider.identifyUser(userData);
    });
  }

  /**
   * Reset user identification across all providers
   */
  resetUser(): void {
    if (!this.isReady()) return;

    this.log('Resetting user identification');

    this.executeOnProviders((provider) => {
      provider.resetUser();
    });
  }

  /**
   * Register global properties (mainly for Mixpanel)
   */
  register(data: EventData): void {
    if (!this.isReady()) return;

    // Filter data to only include simple types for global properties
    const filteredData: Record<string, string | number | boolean> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        filteredData[key] = value;
      }
    });

    this.globalProperties = { ...this.globalProperties, ...filteredData };
    this.log('Registering global properties', data);

    this.executeOnProviders((provider) => {
      if (provider.register) {
        provider.register(data);
      }
    });
  }

  /**
   * Track page view across providers that support it
   */
  trackPageView(url: string, title?: string, data?: EventData): void {
    if (!this.isReady()) return;

    const pageData = { ...this.globalProperties, ...data };
    this.log(`Tracking page view: ${url}`, pageData);

    this.executeOnProviders((provider) => {
      if (provider.trackPageView) {
        provider.trackPageView(url, title, pageData);
      }
    });
  }

  /**
   * Track conversion across providers that support it
   */
  trackConversion(
    eventName: string,
    value?: number,
    currency?: string,
    data?: EventData,
  ): void {
    if (!this.isReady()) return;

    const conversionData = { ...this.globalProperties, ...data };
    this.log(`Tracking conversion: ${eventName}`, {
      value,
      currency,
      ...conversionData,
    });

    this.executeOnProviders((provider) => {
      if (provider.trackConversion) {
        provider.trackConversion(eventName, value, currency, conversionData);
      }
    });
  }

  /**
   * Track a qualified lead across all providers.
   * Each provider decides the event name — see BaseMetricProvider.trackLead().
   */
  trackLead(
    value?: number,
    currency = 'USD',
    data?: EventData,
  ): void {
    if (!this.isReady()) return;

    const conversionData = { ...this.globalProperties, ...data };
    this.log('Tracking lead', { value, currency, ...conversionData });

    this.executeOnProviders((provider) => {
      provider.trackLead?.(value, currency, conversionData);
    });
  }

  /**
   * Set user properties across providers that support it
   */
  setUserProperties(
    properties: Record<string, string | number | boolean>,
  ): void {
    if (!this.isReady()) return;

    this.log('Setting user properties', properties);

    this.executeOnProviders((provider) => {
      if (provider.setUserProperties) {
        provider.setUserProperties(properties);
      }
    });
  }

  /**
   * Execute method on a specific provider
   */
  executeOnProvider<T>(
    providerType: MetricProviderType,
    callback: (provider: MetricProvider) => T,
  ): T | null {
    const provider = this.providers.get(providerType);
    if (!provider || !this.readyProviders.has(providerType)) {
      this.logError(`Provider ${providerType} is not available or ready`);
      return null;
    }

    try {
      return callback(provider);
    } catch (error) {
      this.logError(`Error executing on provider ${providerType}:`, error);
      return null;
    }
  }

  /**
   * Get list of ready providers
   */
  getReadyProviders(): MetricProviderType[] {
    return Array.from(this.readyProviders);
  }

  /**
   * Check if service is ready (at least one provider is ready)
   */
  isReady(): boolean {
    return this.readyProviders.size > 0;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.executeOnProviders((provider) => {
      if (provider.destroy) {
        provider.destroy();
      }
    });

    this.providers.clear();
    this.readyProviders.clear();
    this.initializationSubject.complete();
  }

  /**
   * Execute callback on all ready providers
   */
  private executeOnProviders(
    callback: (provider: MetricProvider) => void,
  ): void {
    this.readyProviders.forEach((providerType) => {
      const provider = this.providers.get(providerType);
      if (provider) {
        try {
          callback(provider);
        } catch (error) {
          this.logError(`Error executing on provider ${providerType}:`, error);
        }
      }
    });
  }

  private log(message: string, data?: unknown): void {
    if (this.enableLogging) {
      console.log(`[MetricsService] ${message}`, data || '');
    }
  }

  private logError(message: string, error?: unknown): void {
    if (this.enableErrorReporting) {
      console.error(`[MetricsService] ${message}`, error || '');
    }
  }
}
