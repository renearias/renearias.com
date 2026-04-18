import { Injectable, inject } from '@angular/core';
import { GoogleAdsConfigService } from './google-ads-config.service';
import { METRICS_CONFIG } from '../config/metrics.config';
import { MetricProviderType } from '../types/metric.types';

/**
 * Service for enhanced conversions with structured data
 */
@Injectable({
  providedIn: 'root'
})
export class EnhancedConversionService {
  private readonly googleAdsConfigService = inject(GoogleAdsConfigService);
  private readonly metricsConfig = inject(METRICS_CONFIG, { optional: true });

  /**
   * Set enhanced conversion data for better tracking
   */
  setEnhancedConversionData(userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    address?: {
      street?: string;
      city?: string;
      region?: string;
      postal_code?: string;
      country?: string;
    };
  }): void {
    if (typeof window.gtag === 'function') {
      const config = this.googleAdsConfigService.getGoogleAdsConfig();
      const conversionId = config?.conversionId;
      
      if (!conversionId) {
        console.warn('Enhanced Conversion: Google Ads conversion ID not configured');
        return;
      }
      
      // Set enhanced conversion data
      window.gtag('config', conversionId, {
        enhanced_conversions: {
          email: userData.email,
          phone_number: userData.phone,
          first_name: userData.firstName,
          last_name: userData.lastName,
          address: userData.address
        }
      });
    }
  }

  /**
   * Track specific conversion events with enhanced data
   */
  trackEnhancedConversion(eventData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    conversionValue?: number;
    currency?: string;
    orderId?: string;
    conversionLabel?: string;
  }): void {
    if (typeof window.gtag === 'function') {
      const config = this.googleAdsConfigService.getGoogleAdsConfig();
      
      if (!config?.conversionId || !config?.conversionLabel) {
        console.warn('Enhanced Conversion: Google Ads configuration not complete');
        return;
      }
      
      const conversionLabel = eventData.conversionLabel || config.conversionLabel;
      const conversionId = config.conversionId;
      
      // Enhanced conversion event
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${conversionLabel}`,
        value: eventData.conversionValue || 1.0,
        currency: eventData.currency || 'USD',
        transaction_id: eventData.orderId || this.generateTransactionId(),
        enhanced_conversion_data: {
          email: eventData.email,
          phone_number: eventData.phone,
          first_name: eventData.firstName,
          last_name: eventData.lastName
        }
      });

      // Additional form completion event
      window.gtag('event', 'form_completion', {
        event_category: 'conversion',
        event_label: 'easy_quote_form',
        value: eventData.conversionValue || 1.0,
        currency: eventData.currency || 'USD'
      });
    }
  }

  /**
   * Generate unique transaction ID
   */
  private generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const brandName = this.metricsConfig?.globalProperties?.['brand'] || 'brand';
    return `${brandName}_${timestamp}_${random}`;
  }

  /**
   * Set user properties for better audience targeting
   */
  setUserProperties(properties: {
    userType?: 'lead' | 'customer' | 'prospect';
    interestLevel?: 'high' | 'medium' | 'low';
    preferredDestination?: string;
    budgetRange?: string;
    travelStyle?: string;
    groupSize?: number;
  }): void {
    if (typeof window.gtag === 'function') {
      // Get Google Analytics ID from configuration
      const analyticsId = this.metricsConfig?.providers?.[MetricProviderType.GOOGLE_ANALYTICS]?.apiKey;
      
      if (!analyticsId) {
        console.warn('Enhanced Conversion: Google Analytics ID not configured');
        return;
      }
      
      window.gtag('config', analyticsId, {
        user_properties: {
          user_type: properties.userType,
          interest_level: properties.interestLevel,
          preferred_destination: properties.preferredDestination,
          budget_range: properties.budgetRange,
          travel_style: properties.travelStyle,
          group_size: properties.groupSize
        }
      });
    }
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
