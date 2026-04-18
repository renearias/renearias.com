import { Injectable, inject } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { MetricProviderType } from '../types/metric.types';
import { EnhancedConversionService } from './enhanced-conversion.service';
import { GoogleAdsConfigService } from './google-ads-config.service';
import { GoogleTagManagerProvider } from '../providers/google-tag-manager.provider';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    google_tag_manager?: unknown;
  }
}

/**
 * Service for handling Google Ads conversions and enhanced conversions
 */
@Injectable({
  providedIn: 'root'
})
export class GoogleConversionService {
  private readonly metricsService = inject(MetricsService);
  private readonly enhancedConversionService = inject(EnhancedConversionService);
  private readonly googleAdsConfigService = inject(GoogleAdsConfigService);

  /**
   * Track form completion event
   */
  trackFormCompletion(formData?: Record<string, unknown>): void {
    const conversionTarget = this.googleAdsConfigService.getConversionTarget();
    
    if (!conversionTarget) {
      console.warn('Google Ads conversion target not configured. Skipping conversion tracking.');
      return;
    }

    // Send to Google Analytics via metrics service
    this.metricsService.sendEvent('form_completion', {
      event_category: 'engagement',
      event_label: 'easy_quote_form',
      ...formData
    });

    // Enhanced conversion tracking
    this.enhancedConversionService.trackEnhancedConversion({
      email: formData?.['email'] as string,
      phone: formData?.['phone'] as string,
      firstName: formData?.['firstName'] as string,
      lastName: formData?.['lastName'] as string,
      conversionValue: 1.0,
      currency: 'USD'
    });

    // Send conversion to Google Ads
    this.trackConversion({
      send_to: conversionTarget,
      value: 1.0,
      currency: 'USD'
    });

    // Send custom event to GTM via MetricsService (will be routed to GTM provider)
    this.metricsService.executeOnProvider(MetricProviderType.GOOGLE_TAG_MANAGER, (provider) => {
      const gtmProvider = provider as GoogleTagManagerProvider;
      gtmProvider.pushToDataLayer({
        event: 'form_completion',
        form_type: 'easy_quote',
        conversion_value: 1.0,
        currency: 'USD',
        ...formData
      });
    });

    // Set user properties for better targeting
    this.enhancedConversionService.setUserProperties({
      userType: 'lead',
      interestLevel: 'high',
      preferredDestination: formData?.['destination'] as string,
      budgetRange: formData?.['budget'] as string,
      groupSize: formData?.['travelers'] as number
    });
  }

  /**
   * Track thank you page view
   */
  trackThanksPageView(formData?: Record<string, unknown>): void {
    // Track page view
    this.metricsService.trackPageView('/easy-quote/thanks', 'Thank You - Easy Quote', {
      event_category: 'conversion',
      conversion_type: 'form_completion',
      ...formData
    });

    // Send lead conversion
    this.metricsService.sendEvent('generate_lead', {
      event_category: 'conversion',
      event_label: 'easy_quote_completion',
      value: 1.0,
      currency: 'USD',
      ...formData
    });

    // Send to GTM via provider
    this.metricsService.executeOnProvider(MetricProviderType.GOOGLE_TAG_MANAGER, (provider) => {
      const gtmProvider = provider as GoogleTagManagerProvider;
      gtmProvider.pushToDataLayer({
        event: 'thank_you_page_view',
        page_type: 'conversion',
        form_type: 'easy_quote',
        ...formData
      });
    });
  }

  /**
   * Track form step progression
   */
  trackFormStep(step: number, stepName: string): void {
    this.metricsService.sendEvent('form_step_progress', {
      event_category: 'engagement',
      event_label: `step_${step}_${stepName}`,
      step_number: step,
      step_name: stepName
    });

    // Send to GTM via provider
    this.metricsService.executeOnProvider(MetricProviderType.GOOGLE_TAG_MANAGER, (provider) => {
      const gtmProvider = provider as GoogleTagManagerProvider;
      gtmProvider.pushToDataLayer({
        event: 'form_step_progress',
        step_number: step,
        step_name: stepName,
        form_type: 'easy_quote'
      });
    });
  }

  /**
   * Track conversion with enhanced data
   */
  private trackConversion(conversionData: Record<string, unknown>): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', conversionData);
    }
  }

  /**
   * Get form data for conversion tracking
   */
  getConversionData(formValue: Record<string, unknown>): Record<string, unknown> {
    const config = this.googleAdsConfigService.getGoogleAdsConfig();

    return {
      // Add enhanced conversion data
      email: formValue['email'] || '',
      phone: formValue['phone'] || '',
      firstName: formValue['firstName'] || '',
      lastName: formValue['lastName'] || '',
      
      // Trip details for better targeting
      destination: formValue['destination'] || '',
      travelers: formValue['travelers'] || 1,
      duration: formValue['duration'] || '',
      budget: formValue['budget'] || '',
      travelDate: formValue['travelDate'] || '',
      
      // Conversion tracking
      conversion_id: config?.conversionId,
      conversion_label: config?.conversionLabel,
      
      // Timestamp
      timestamp: new Date().toISOString()
    };
  }
}
