import { InjectionToken } from '@angular/core';
import { MetricProviderType, MetricProviderConfig } from '../types/metric.types';

/**
 * Configuration for the metrics service
 */
export interface MetricsConfig {
  providers: Partial<Record<MetricProviderType, MetricProviderConfig>>;
  globalProperties?: Record<string, string | number | boolean>;
  enableLogging?: boolean;
  enableErrorReporting?: boolean;
}

/**
 * Injection token for metrics configuration
 */
export const METRICS_CONFIG = new InjectionToken<MetricsConfig>('METRICS_CONFIG');

/**
 * Injection token for metric providers
 */
export const METRIC_PROVIDERS = new InjectionToken<MetricProviderType[]>('METRIC_PROVIDERS');
