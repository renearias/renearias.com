/**
 * Configuration for metric providers
 */
export interface MetricProviderConfig {
  enabled: boolean;
  apiKey?: string;
  options?: Record<string, unknown>;
}

/**
 * Event data interface
 */
export interface EventData {
  [key: string]: string | number | boolean | null | undefined | EventData | EventData[];
}

/**
 * User identification data
 */
export interface UserData {
  id: string | number;
  email?: string;
  name?: string;
  properties?: Record<string, string | number | boolean | null>;
}

/**
 * Metric provider types
 */
export enum MetricProviderType {
  GOOGLE_ANALYTICS = 'googleAnalytics',
  GOOGLE_TAG_MANAGER = 'googleTagManager',
  FACEBOOK_PIXEL = 'facebookPixel',
  MIXPANEL = 'mixpanel',
  HOTJAR = 'hotjar',
  CUSTOMER_IO = 'customerIO',
  KOCHAVA = 'kochava'
}

/**
 * Metric event types
 */
export enum MetricEventType {
  PAGE_VIEW = 'page_view',
  CLICK = 'click',
  CONVERSION = 'conversion',
  SIGNUP = 'signup',
  LOGIN = 'login',
  PURCHASE = 'purchase',
  CUSTOM = 'custom'
}
