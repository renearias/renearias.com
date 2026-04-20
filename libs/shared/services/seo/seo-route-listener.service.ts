import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SeoConfig } from './seo-config.interface';
import { SeoService } from './seo.service';

@Injectable({ providedIn: 'root' })
export class SeoRouteListenerService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  init(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const leaf = this.getLeafRoute(this.activatedRoute);
        const seo: SeoConfig | undefined = leaf.snapshot.data['seo'];
        if (seo) {
          const url = 'https://renearias.com' + event.urlAfterRedirects.split('?')[0];
          this.seoService.update({ ...seo, ogUrl: seo.ogUrl || url });
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
