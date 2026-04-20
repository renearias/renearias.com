import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  styles: [`
    .hero-photo {
      object-fit: cover;
      object-position: center top;
      width: 100%;
      height: 100%;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim-1 { animation: fadeUp 0.8s ease forwards; }
    .anim-2 { animation: fadeUp 0.8s 0.15s ease both; }
    .anim-3 { animation: fadeUp 0.8s 0.3s ease both; }
    .anim-4 { animation: fadeUp 0.8s 0.45s ease both; }
    .anim-5 { animation: fadeUp 0.8s 0.6s ease both; }
  `],
  template: `
    <!-- Hero: full-screen cinematic split -->
    <section class="relative min-h-screen flex overflow-hidden bg-[#0a0a0a]">

      <!-- Right panel: portrait photo (desktop) -->
      <div class="hidden md:block absolute right-0 top-0 h-full" style="width:48%">
        <!-- gradient blend: photo left edge fades into bg -->
        <div class="absolute inset-0 z-10 pointer-events-none"
             style="background: linear-gradient(to right, #0a0a0a 0%, #0a0a0a 4%, rgba(10,10,10,0.55) 28%, transparent 56%)">
        </div>
        <!-- bottom fade -->
        <div class="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-40"
             style="background: linear-gradient(to top, #0a0a0a 0%, transparent 100%)">
        </div>
        <img
          src="/images/rene-arias-banner.jpg"
          alt="René Arias"
          class="hero-photo"
        />
      </div>

      <!-- Mobile background photo -->
      <div class="md:hidden absolute inset-0">
        <div class="absolute inset-0 z-10 pointer-events-none"
             style="background: linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)">
        </div>
        <img
          src="/images/rene-arias-banner.jpg"
          alt="René Arias"
          class="hero-photo"
        />
      </div>

      <!-- Left panel: content -->
      <div class="relative z-20 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24
                  pt-28 pb-20 w-full md:w-[56%] lg:w-[52%]">

        <!-- Logo mark -->
        <div class="anim-1 mb-10">
          <img
            src="/images/rene-arias-logo.png"
            alt="René Arias"
            class="h-16 w-auto opacity-90"
            style="filter: drop-shadow(0 0 20px rgba(212,175,55,0.18))"
          />
        </div>

        <!-- Eyebrow -->
        <p class="anim-2 text-[#888888] text-xs uppercase tracking-[0.4em] mb-6">
          {{ 'home.eyebrow' | translate }}
        </p>

        <!-- Name headline -->
        <h1 class="anim-3 font-display font-bold leading-[0.88] mb-8"
            style="font-size: clamp(3.5rem, 8vw, 7rem)">
          <span class="block text-[#e8e8e8]">René</span>
          <span class="block text-[#d4af37] italic">Arias</span>
        </h1>

        <!-- Tagline -->
        <p class="anim-4 text-[#888888] text-lg leading-relaxed max-w-sm mb-12">
          {{ 'home.tagline' | translate }}
        </p>

        <!-- CTAs -->
        <div class="anim-5 flex flex-wrap gap-4">
          <a routerLink="/engineering"
             class="px-8 py-3 bg-[#d4af37] text-[#0a0a0a] font-semibold text-sm tracking-wider uppercase
                    hover:bg-[#c9a227] transition-colors">
            {{ 'home.cta_work' | translate }}
          </a>
          <a routerLink="/music"
             class="px-8 py-3 border border-[#7c3aed] text-[#7c3aed] font-semibold text-sm tracking-wider uppercase
                    hover:bg-[#7c3aed] hover:text-white transition-colors">
            {{ 'home.cta_music' | translate }}
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-8 md:left-16 lg:left-24 z-20 flex flex-col items-start gap-2 opacity-35">
        <span class="text-[10px] uppercase tracking-[0.4em] text-[#888888]">{{ 'home.scroll' | translate }}</span>
        <div class="w-px h-10 bg-gradient-to-b from-[#888888] to-transparent animate-pulse"></div>
      </div>
    </section>

    <!-- Manifesto -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">{{ 'home.manifesto_label' | translate }}</p>
          <blockquote class="font-display text-3xl md:text-4xl text-[#e8e8e8] leading-relaxed italic">
            {{ 'home.manifesto_quote' | translate }}
          </blockquote>
        </div>
      </div>
    </section>

    <!-- Engineering Section -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-3">{{ 'home.engineering_label' | translate }}</p>
            <h2 class="text-4xl font-bold text-[#e8e8e8]">{{ 'home.featured_work' | translate }}</h2>
          </div>
          <a routerLink="/engineering" class="text-sm text-[#888888] hover:text-[#d4af37] transition-colors uppercase tracking-wider">{{ 'home.view_all' | translate }}</a>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          @for (project of featuredProjects; track project.title) {
            <div class="border border-[#1f1f1f] p-6 hover:border-[#d4af37]/30 transition-colors group">
              <div class="text-[#d4af37] text-xs uppercase tracking-widest mb-4">{{ project.status }}</div>
              <h3 class="text-[#e8e8e8] font-semibold text-lg mb-3 group-hover:text-[#d4af37] transition-colors">{{ project.title }}</h3>
              <p class="text-[#888888] text-sm leading-relaxed mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-5">
                @for (tech of project.technologies; track tech) {
                  <span class="text-xs text-[#888888] border border-[#1f1f1f] px-2 py-1">{{ tech }}</span>
                }
              </div>
              @if (project.repoUrl) {
                <a [href]="project.repoUrl" target="_blank" rel="noopener noreferrer"
                   class="text-xs text-[#888888] hover:text-[#d4af37] transition-colors uppercase tracking-widest">
                  GitHub →
                </a>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Music Section -->
    <section class="py-24 px-6 border-t border-[#1f1f1f] bg-[#111111]">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <p class="text-[#7c3aed] text-sm uppercase tracking-[0.3em] mb-3">{{ 'home.music_label' | translate }}</p>
            <h2 class="text-4xl font-bold text-[#e8e8e8]">{{ 'home.latest_releases' | translate }}</h2>
          </div>
          <a routerLink="/music" class="text-sm text-[#888888] hover:text-[#7c3aed] transition-colors uppercase tracking-wider">{{ 'home.discography' | translate }}</a>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          @for (release of latestReleases; track release.title) {
            <a [href]="release.spotifyUrl" target="_blank" rel="noopener noreferrer" class="group block">
              <div class="aspect-square overflow-hidden mb-4 relative">
                <img [src]="release.coverArt" [alt]="release.title"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-[#7c3aed]/0 group-hover:bg-[#7c3aed]/10 transition-colors duration-300"></div>
              </div>
              <p class="text-[#888888] text-xs uppercase tracking-widest mb-1">{{ release.type }} · {{ release.year }}</p>
              <h3 class="text-[#e8e8e8] font-semibold group-hover:text-[#7c3aed] transition-colors">{{ release.title }}</h3>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Writing Section -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-3">{{ 'home.writing_label' | translate }}</p>
            <h2 class="text-4xl font-bold text-[#e8e8e8]">{{ 'home.recent_articles' | translate }}</h2>
          </div>
          <a routerLink="/writing" class="text-sm text-[#888888] hover:text-[#d4af37] transition-colors uppercase tracking-wider">{{ 'home.all_articles' | translate }}</a>
        </div>
        
        <div class="space-y-1">
          @for (article of recentArticles; track article.title) {
            <div class="flex items-start gap-6 py-6 border-b border-[#1f1f1f] group cursor-pointer hover:pl-2 transition-all">
              <span class="text-[#888888] text-sm w-28 shrink-0">{{ article.date }}</span>
              <div class="flex-1">
                <h3 class="text-[#e8e8e8] font-medium mb-1 group-hover:text-[#d4af37] transition-colors">{{ article.title }}</h3>
                <p class="text-[#888888] text-sm">{{ article.excerpt }}</p>
              </div>
              <span class="text-[#888888] text-sm shrink-0">{{ article.readTime }} min</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">{{ 'about.get_in_touch' | translate }}</p>
        <h2 class="font-display text-5xl font-bold text-[#e8e8e8] mb-6">{{ 'home.cta_build' | translate }}</h2>
        <p class="text-[#888888] text-lg mb-10 max-w-md mx-auto">{{ 'home.cta_build_sub' | translate }}</p>
        <a routerLink="/contact" class="inline-block px-10 py-4 bg-[#d4af37] text-[#0a0a0a] font-bold tracking-widest uppercase hover:bg-[#c9a227] transition-colors">
          {{ 'contact.heading' | translate }}
        </a>
      </div>
    </section>
  `,
})
export class HomeComponent {
  featuredProjects = [
    {
      status: 'Open Source',
      title: 'renearias.com',
      description: 'Source code for this site — Angular SSR frontend, NestJS API, and Nx monorepo deployed on Firebase.',
      technologies: ['Angular', 'NestJS', 'Nx', 'TypeScript', 'Firebase'],
      repoUrl: 'https://github.com/renearias/renearias.com',
    },
    {
      status: 'Open Source',
      title: 'Arxis',
      description: 'Angular utilities for Firebase authentication and Firestore — auth facades, typed helpers, and RxJS integration.',
      technologies: ['Angular', 'Firebase', 'TypeScript', 'RxJS'],
      repoUrl: 'https://github.com/renearias/arxis',
    },
    {
      status: 'Side Project',
      title: 'Music Production Tracker',
      description: 'Personal tool for tracking music projects, samples, and inspiration with AI-powered tagging.',
      technologies: ['Angular', 'Firebase', 'OpenAI', 'Tone.js'],
    },
  ];

  latestReleases = [
    { title: 'La Reina', type: 'Single', year: '2026', coverArt: '/images/la-reina.jpg', spotifyUrl: 'https://open.spotify.com/track/1z6cPUvErtpQVGwFY6yDKI' },
    { title: 'La Oveja Que Era Lobo', type: 'Single', year: '2026', coverArt: '/images/la-oveja-que-era-lobo.jpg', spotifyUrl: 'https://open.spotify.com/track/76gF5RrkLNza1BMWYqo63P' },
    { title: 'Corazon De Hielo', type: 'Single', year: '2026', coverArt: '/images/corazon-de-hielo.jpg', spotifyUrl: 'https://open.spotify.com/track/5sT8rKCnjSO5wXhb9NMA90' },
  ];

  recentArticles = [
    { date: 'Dec 2024', title: 'Building SSR Angular Apps That Actually Scale', excerpt: 'Lessons from taking an Angular SSR app to 100k monthly visitors.', readTime: 8 },
    { date: 'Nov 2024', title: 'The Discipline of Music Production as Software Engineering', excerpt: 'What I learned about systems thinking from making albums.', readTime: 6 },
    { date: 'Oct 2024', title: 'Why I Use Nx in Every Project Now', excerpt: 'After two years with Nx monorepos, here\'s an honest assessment.', readTime: 5 },
  ];
}
