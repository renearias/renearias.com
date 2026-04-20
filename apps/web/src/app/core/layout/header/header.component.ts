import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { I18nService, SupportedLocale } from 'i18n';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, TranslatePipe],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-md">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a routerLink="/" class="text-xl font-bold tracking-tight text-[#e8e8e8] hover:text-[#d4af37] transition-colors">
          René Arias
        </a>
        
        <ul class="hidden md:flex items-center gap-8 text-sm text-[#888888]">
          <li><a routerLink="/engineering" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">{{ 'nav.engineering' | translate }}</a></li>
          <li><a routerLink="/music" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">{{ 'nav.music' | translate }}</a></li>
          <li><a routerLink="/writing" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">{{ 'nav.writing' | translate }}</a></li>
          <li><a routerLink="/lab" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">{{ 'nav.lab' | translate }}</a></li>
          <li><a routerLink="/contact" class="px-4 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all text-xs tracking-widest uppercase">{{ 'nav.contact' | translate }}</a></li>
          <li>
            <div class="flex items-center gap-1 text-xs tracking-widest">
              <button
                (click)="setLang('en')"
                [ngClass]="currentLang() === 'en' ? 'text-[#d4af37]' : 'text-[#555555] hover:text-[#888888]'"
                class="transition-colors uppercase">EN</button>
              <span class="text-[#333333]">/</span>
              <button
                (click)="setLang('es')"
                [ngClass]="currentLang() === 'es' ? 'text-[#d4af37]' : 'text-[#555555] hover:text-[#888888]'"
                class="transition-colors uppercase">ES</button>
            </div>
          </li>
        </ul>

        <div class="md:hidden flex items-center gap-4">
          <div class="flex items-center gap-1 text-xs tracking-widest">
            <button
              (click)="setLang('en')"
              [ngClass]="currentLang() === 'en' ? 'text-[#d4af37]' : 'text-[#555555]'"
              class="transition-colors uppercase">EN</button>
            <span class="text-[#333333]">/</span>
            <button
              (click)="setLang('es')"
              [ngClass]="currentLang() === 'es' ? 'text-[#d4af37]' : 'text-[#555555]'"
              class="transition-colors uppercase">ES</button>
          </div>
          <button (click)="menuOpen.set(!menuOpen())" class="text-[#888888] hover:text-[#e8e8e8]">
            {{ menuOpen() ? '✕' : '☰' }}
          </button>
        </div>
      </nav>
      
      <div [ngClass]="{'hidden': !menuOpen()}" class="md:hidden border-t border-[#1f1f1f] px-6 py-4 space-y-3">
        <a routerLink="/engineering" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">{{ 'nav.engineering' | translate }}</a>
        <a routerLink="/music" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">{{ 'nav.music' | translate }}</a>
        <a routerLink="/writing" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">{{ 'nav.writing' | translate }}</a>
        <a routerLink="/lab" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">{{ 'nav.lab' | translate }}</a>
        <a routerLink="/contact" (click)="menuOpen.set(false)" class="block text-sm text-[#d4af37] tracking-wide uppercase py-2">{{ 'nav.contact' | translate }}</a>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = signal(false);
  currentLang = signal<SupportedLocale>('en');

  private i18n = inject(I18nService);
  private langSub?: Subscription;

  ngOnInit() {
    this.currentLang.set(this.i18n.currentLang);
    this.langSub = this.i18n.onLangChange.subscribe(event => {
      this.currentLang.set(event.lang as SupportedLocale);
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  setLang(lang: SupportedLocale) {
    this.i18n.use(lang);
  }
}
