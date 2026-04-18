import { Component, inject, OnInit } from '@angular/core';
import { MetricsService, EventData, UserData, MetricProviderType } from '../index';

/**
 * Example component showing how to use the MetricsService
 */
@Component({
  selector: 'lib-metrics-example',
  template: `
    <div>
      <h2>Metrics Service Example</h2>
      
      <button (click)="trackButtonClick()">Track Button Click</button>
      <button (click)="identifyUser()">Identify User</button>
      <button (click)="trackPurchase()">Track Purchase</button>
      <button (click)="resetUser()">Reset User</button>
      
      <p>Ready providers: {{ readyProviders.join(', ') }}</p>
      <p>Service ready: {{ isServiceReady }}</p>
    </div>
  `
})
export class MetricsExampleComponent implements OnInit {
  private readonly metricsService = inject(MetricsService);
  
  readyProviders: string[] = [];
  isServiceReady = false;

  ngOnInit(): void {
    // Wait for service to be ready
    this.metricsService.isInitialized$.subscribe(isReady => {
      this.isServiceReady = isReady;
      if (isReady) {
        this.readyProviders = this.metricsService.getReadyProviders();
        
        // Register global properties
        this.metricsService.register({
          user_type: 'premium',
          app_version: '2.1.0'
        });

        // Track page view
        this.metricsService.trackPageView(
          '/metrics-example',
          'Metrics Example Page',
          { section: 'examples' }
        );
      }
    });
  }

  trackButtonClick(): void {
    const eventData: EventData = {
      button_id: 'example-button',
      timestamp: Date.now(),
      user_agent: navigator.userAgent
    };

    this.metricsService.sendEvent('button_click', eventData);
  }

  identifyUser(): void {
    const userData: UserData = {
      id: '12345',
      email: 'user@example.com',
      name: 'John Doe',
      properties: {
        plan: 'premium',
        signup_date: '2024-01-15',
        country: 'PE'
      }
    };

    this.metricsService.identifyUser(userData);
  }

  trackPurchase(): void {
    // Track conversion with value
    this.metricsService.trackConversion(
      'purchase',
      99.99,
      'USD',
      {
        product_id: 'tour-machu-picchu',
        product_name: 'Machu Picchu Tour',
        category: 'tours',
        quantity: 1
      }
    );

    // Also send as regular event
    this.metricsService.sendEvent('purchase_completed', {
      revenue: 99.99,
      currency: 'USD',
      transaction_id: 'txn_' + Date.now(),
      payment_method: 'credit_card'
    });
  }

  resetUser(): void {
    this.metricsService.resetUser();
  }

  // Example of provider-specific functionality
  trackMixpanelSpecific(): void {
    // Execute only on Mixpanel provider
    this.metricsService.executeOnProvider(MetricProviderType.MIXPANEL, (provider) => {
      if (provider.register) {
        provider.register({
          super_property: 'mixpanel_only_value'
        });
      }
    });
  }

  // Example of setting user properties
  updateUserProfile(): void {
    this.metricsService.setUserProperties({
      subscription_status: 'active',
      last_login: new Date().toISOString(),
      preferred_language: 'es'
    });
  }
}
