import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SeoConfig } from './seo-config.interface';
import { SeoService } from './seo.service';
import { SEO_BASE_URL } from './seo.tokens';

@Injectable({ providedIn: 'root' })
export class SeoRouteListenerService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly baseUrl = inject(SEO_BASE_URL);

  init(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const leaf = this.getLeafRoute(this.activatedRoute);
        const seo: SeoConfig | undefined = leaf.snapshot.data['seo'];
        if (seo) {
          const url = this.baseUrl + event.urlAfterRedirects.split('?')[0];
          const alternates = (seo.alternates ?? []).map((alt) => ({
            ...alt,
            href: alt.href.startsWith('/') ? this.baseUrl + alt.href : alt.href,
          }));
          this.seoService.update({ ...seo, ogUrl: seo.ogUrl || url, alternates });
        }
      });
  }

  private getLeafRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
