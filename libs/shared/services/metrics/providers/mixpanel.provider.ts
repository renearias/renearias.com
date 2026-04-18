import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from '@alaz/utils';
import { BaseMetricProvider } from '../interfaces/metric-provider.interface';
import { EventData, UserData, MetricProviderConfig, MetricProviderType } from '../types/metric.types';

declare global {
  interface Window {
    mixpanel?: MixpanelInstance;
  }
}

interface MixpanelInstance {
  init: (token: string, options?: Record<string, unknown>) => void;
  track: (eventName: string, data?: Record<string, unknown>) => void;
  identify: (userId: string) => void;
  people: {
    set: (properties: Record<string, unknown>) => void;
  };
  register: (properties: Record<string, unknown>) => void;
  reset: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class MixpanelProvider extends BaseMetricProvider {
  readonly name = MetricProviderType.MIXPANEL;
  override core: unknown = null;

  private readonly scriptLoader = inject(DynamicScriptLoaderService);
  private readonly platformId = inject(PLATFORM_ID);

  protected doInitialize(config: MetricProviderConfig): Observable<boolean> {
    return new Observable(subscriber => {
      if (!config.apiKey) {
        console.error('Mixpanel: API Key is required');
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      const options = JSON.stringify(config.options ?? { autocapture: true, record_sessions_percent: 100 });

      // Official Mixpanel snippet — sets up stub synchronously and loads CDN script async
      const mixpanelScript = `
        (function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);
        mixpanel.init('${config.apiKey}', ${options});
      `;

      this.scriptLoader.injectInlineScript(
        mixpanelScript,
        'mixpanel-inline',
        { appendTo: 'head' }
      ).subscribe({
        next: (success: boolean) => {
          if (success) {
            if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
              this.core = window.mixpanel;
            }
            this.setReady(true);
            subscriber.next(true);
            subscriber.complete();
          } else {
            console.error('Mixpanel: Failed to inject script');
            subscriber.next(false);
            subscriber.complete();
          }
        },
        error: (error: unknown) => {
          console.error('Mixpanel: Script injection error:', error);
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });
  }

  sendEvent(eventName: string, data?: EventData): void {
    if (!this.isReady() || !window.mixpanel) return;

    try {
      window.mixpanel.track(eventName, data as Record<string, unknown> || {});
    } catch (error) {
      console.error('Mixpanel sendEvent error:', error);
    }
  }

  identifyUser(userData: UserData): void {
    if (!this.isReady() || !window.mixpanel) return;

    try {
      window.mixpanel.identify(userData.id.toString());

      if (userData.properties) {
        window.mixpanel.people.set(userData.properties as Record<string, unknown>);
      }
    } catch (error) {
      console.error('Mixpanel identifyUser error:', error);
    }
  }

  resetUser(): void {
    if (!this.isReady() || !window.mixpanel) return;

    try {
      window.mixpanel.reset();
    } catch (error) {
      console.error('Mixpanel resetUser error:', error);
    }
  }

  register(data: EventData): void {
    if (!this.isReady() || !window.mixpanel) return;

    try {
      window.mixpanel.register(data as Record<string, unknown>);
    } catch (error) {
      console.error('Mixpanel register error:', error);
    }
  }

  setUserProperties(properties: Record<string, string | number | boolean>): void {
    if (!this.isReady() || !window.mixpanel) return;

    try {
      window.mixpanel.people.set(properties as Record<string, unknown>);
    } catch (error) {
      console.error('Mixpanel setUserProperties error:', error);
    }
  }
}
