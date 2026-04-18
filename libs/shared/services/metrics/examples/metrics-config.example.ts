import { ApplicationConfig } from '@angular/core';
import { 
  MetricsService, 
  METRICS_CONFIG, 
  MetricProviderType,
  MetricsConfig 
} from '../index';

/**
 * Example configuration for metrics service
 */
const metricsConfig: MetricsConfig = {
  enableLogging: true,
  enableErrorReporting: true,
  globalProperties: {
    platform: 'web',
    version: '1.0.0'
  },
  providers: {
    [MetricProviderType.GOOGLE_ANALYTICS]: {
      enabled: true,
      apiKey: 'GA_MEASUREMENT_ID', // Replace with actual GA4 Measurement ID
      options: {
        anonymize_ip: true,
        allow_google_signals: false
      }
    },
    [MetricProviderType.FACEBOOK_PIXEL]: {
      enabled: true,
      apiKey: 'FACEBOOK_PIXEL_ID', // Replace with actual Facebook Pixel ID
      options: {
        autoConfig: true
      }
    },
    [MetricProviderType.MIXPANEL]: {
      enabled: true,
      apiKey: 'MIXPANEL_PROJECT_TOKEN', // Replace with actual Mixpanel token
      options: {
        debug: false,
        track_pageview: true
      }
    },
    [MetricProviderType.HOTJAR]: {
      enabled: false, // Not implemented yet
      apiKey: 'HOTJAR_SITE_ID'
    }
  }
};

/**
 * Provider configuration for Angular application
 */
export const metricsProviders = [
  {
    provide: METRICS_CONFIG,
    useValue: metricsConfig
  },
  MetricsService
];

/**
 * Example application configuration with metrics
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    ...metricsProviders
  ]
};
