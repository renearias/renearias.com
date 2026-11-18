import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'app-root',
  template: `
    @if (!isInvitation()) { <app-header /> }
    <main class="min-h-screen">
      <router-outlet />
    </main>
    @if (!isInvitation()) { <app-footer /> }
  `,
})
export class App {
  private readonly router = inject(Router);
  readonly isInvitation = signal(this.router.url.startsWith('/cumpleanos/'));

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe((event) => this.isInvitation.set(event.urlAfterRedirects.split('?')[0].startsWith('/cumpleanos/')));
  }
}
