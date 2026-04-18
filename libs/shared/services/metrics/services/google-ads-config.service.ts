import { Injectable, inject } from '@angular/core';
import { METRICS_CONFIG } from '../config/metrics.config';

/**
 * Interface for Google Ads configuration
 */
export interface GoogleAdsConfig {
  conversionId: string;
  conversionLabel: string;
  gtmId: string;
}

/**
 * Service to provide Google Ads configuration from metrics config
 */
@Injectable({
  providedIn: 'root'
})
export class GoogleAdsConfigService {
  private readonly metricsConfig = inject(METRICS_CONFIG, { optional: true });

  /**
   * Get Google Ads configuration from metrics config
   */
  getGoogleAdsConfig(): GoogleAdsConfig | null {
    const googleAnalyticsProvider = this.metricsConfig?.providers?.['googleAnalytics'];
    
    if (!googleAnalyticsProvider?.options?.['google_ads_config']) {
      console.warn('Google Ads configuration not found in metrics config');
      return null;
    }

    return googleAnalyticsProvider.options['google_ads_config'] as GoogleAdsConfig;
  }

  /**
   * Get Google Tag Manager ID
   */
  getGTMId(): string | null {
    const config = this.getGoogleAdsConfig();
    return config?.gtmId || null;
  }

  /**
   * Get Google Ads conversion ID
   */
  getConversionId(): string | null {
    const config = this.getGoogleAdsConfig();
    return config?.conversionId || null;
  }

  /**
   * Get Google Ads conversion label
   */
  getConversionLabel(): string | null {
    const config = this.getGoogleAdsConfig();
    return config?.conversionLabel || null;
  }

  /**
   * Get full conversion target (conversionId/conversionLabel)
   */
  getConversionTarget(): string | null {
    const config = this.getGoogleAdsConfig();
    if (!config?.conversionId || !config?.conversionLabel) {
      return null;
    }
    return `${config.conversionId}/${config.conversionLabel}`;
  }

  /**
   * Check if Google Ads is properly configured
   */
  isConfigured(): boolean {
    const config = this.getGoogleAdsConfig();
    return !!(config?.conversionId && config?.conversionLabel && config?.gtmId);
  }
}
