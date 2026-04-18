

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@alaz/utils';
import { BaseMetricProvider } from '../interfaces/metric-provider.interface';
import { MetricProviderConfig, MetricProviderType } from '../types/metric.types';

@Injectable({ providedIn: 'root' })
export class HotjarProvider extends BaseMetricProvider {
  readonly name = MetricProviderType.HOTJAR;
  override core: unknown = null;

  private readonly scriptLoader = inject(DynamicScriptLoaderService);
  private readonly platformId = inject(PLATFORM_ID);

  protected doInitialize(config: MetricProviderConfig): Observable<boolean> {
    return new Observable(subscriber => {
      const hjid = config.apiKey;
      if (!hjid) {
        console.error('Hotjar: hjid (apiKey) is required');
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      const hotjarScript = `
        (function (c, s, q, u, a, r, e) {
          c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
          c._hjSettings = { hjid: a };
          r = s.getElementsByTagName('head')[0];
          e = s.createElement('script');
          e.async = true;
          e.src = q + c._hjSettings.hjid + u;
          r.appendChild(e);
        })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', ${hjid});
      `;
      this.scriptLoader.injectInlineScript(
        hotjarScript,
        'hotjar-inline',
        { appendTo: 'head' }
      ).subscribe({
        next: (success: boolean) => {
          if (success) {
            if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
              this.core = (window as typeof window & { hj?: unknown }).hj;
            }
            this.setReady(true);
            subscriber.next(true);
            subscriber.complete();
          } else {
            console.error('Hotjar: Failed to inject script');
            subscriber.next(false);
            subscriber.complete();
          }
        },
        error: (error: unknown) => {
          console.error('Hotjar: Script injection error:', error);
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });
  }

  override sendEvent(): void {
    // Hotjar does not support custom event tracking via JS API
  }

  override identifyUser(): void {
    // Not supported
  }

  override resetUser(): void {
    // Not supported
  }
}
