import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-md">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a routerLink="/" class="text-xl font-bold tracking-tight text-[#e8e8e8] hover:text-[#d4af37] transition-colors">
          René Arias
        </a>
        
        <ul class="hidden md:flex items-center gap-8 text-sm text-[#888888]">
          <li><a routerLink="/engineering" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">Engineering</a></li>
          <li><a routerLink="/music" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">Music</a></li>
          <li><a routerLink="/writing" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">Writing</a></li>
          <li><a routerLink="/lab" routerLinkActive="text-[#e8e8e8]" class="hover:text-[#e8e8e8] transition-colors tracking-wide uppercase">Lab</a></li>
          <li><a routerLink="/contact" class="px-4 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all text-xs tracking-widest uppercase">Contact</a></li>
        </ul>

        <button (click)="menuOpen.set(!menuOpen())" class="md:hidden text-[#888888] hover:text-[#e8e8e8]">
          {{ menuOpen() ? '✕' : '☰' }}
        </button>
      </nav>
      
      <div [ngClass]="{'hidden': !menuOpen()}" class="md:hidden border-t border-[#1f1f1f] px-6 py-4 space-y-3">
        <a routerLink="/engineering" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">Engineering</a>
        <a routerLink="/music" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">Music</a>
        <a routerLink="/writing" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">Writing</a>
        <a routerLink="/lab" (click)="menuOpen.set(false)" class="block text-sm text-[#888888] hover:text-[#e8e8e8] tracking-wide uppercase py-2">Lab</a>
        <a routerLink="/contact" (click)="menuOpen.set(false)" class="block text-sm text-[#d4af37] tracking-wide uppercase py-2">Contact</a>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  menuOpen = signal(false);
}
