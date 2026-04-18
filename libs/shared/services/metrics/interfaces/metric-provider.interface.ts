import { Observable } from 'rxjs';
import { EventData, UserData, MetricProviderConfig } from '../types/metric.types';

/**
 * Base interface that all metric providers must implement
 */
export interface MetricProvider {
  /**
   * Provider name identifier
   */
  readonly name: string;

  /**
   * The core object of the provider, like mixpanel, google analytics, facebook pixel, etc.
   */
  core: unknown;

  /**
   * Initialize the provider with configuration
   */
  initialize(config: MetricProviderConfig): Observable<boolean>;

  /**
   * Check if provider is ready to send events
   */
  isReady(): boolean;

  /**
   * Send a custom event
   */
  sendEvent(eventName: string, data?: EventData): void;

  /**
   * Identify a user
   */
  identifyUser(userData: UserData): void;

  /**
   * Reset/clear user identification
   */
  resetUser(): void;

  /**
   * Register global properties (mainly for providers like Mixpanel)
   */
  register?(data: EventData): void;

  /**
   * Track page view
   */
  trackPageView?(url: string, title?: string, data?: EventData): void;

  /**
   * Track conversion
   */
  trackConversion?(eventName: string, value?: number, currency?: string, data?: EventData): void;

  /**
   * Track a qualified lead using this provider's native event name.
   * Default implementation sends 'generate_lead'; providers override as needed.
   */
  trackLead?(value?: number, currency?: string, data?: EventData): void;

  /**
   * Set user properties
   */
  setUserProperties?(properties: Record<string, string | number | boolean>): void;

  /**
   * Clean up resources
   */
  destroy?(): void;
}

/**
 * Abstract base class for metric providers
 */
export abstract class BaseMetricProvider implements MetricProvider {
  abstract readonly name: string;
  protected config: MetricProviderConfig | null = null;
  protected ready = false;

  /**
   * The core object of the provider (e.g., window.fbq, window.gtag, window.mixpanel)
   * This should be set by each provider implementation once the library is loaded
   */
  core: unknown = null;

  initialize(config: MetricProviderConfig): Observable<boolean> {
    this.config = config;
    if (!config.enabled) {
      return new Observable(subscriber => {
        subscriber.next(false);
        subscriber.complete();
      });
    }
    return this.doInitialize(config);
  }

  isReady(): boolean {
    return this.ready && this.config?.enabled === true;
  }

  protected abstract doInitialize(config: MetricProviderConfig): Observable<boolean>;

  abstract sendEvent(eventName: string, data?: EventData): void;
  abstract identifyUser(userData: UserData): void;
  abstract resetUser(): void;

  protected setReady(ready: boolean): void {
    this.ready = ready;
  }

  /**
   * Default: sends a generic 'generate_lead' event via sendEvent.
   * GA/GTM providers override to use trackConversion for richer data.
   * Meta Pixel overrides to use the standard 'Lead' event name.
   */
  trackLead(value?: number, currency?: string, data?: EventData): void {
    this.sendEvent('generate_lead', data);
  }
}
