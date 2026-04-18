import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <section class="min-h-screen flex items-center pt-20 px-6">
      <div class="max-w-6xl mx-auto w-full">
        <div class="max-w-3xl">
          <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">Software Engineer · Music Artist</p>
          <h1 class="font-display text-6xl md:text-8xl font-bold text-[#e8e8e8] leading-[0.95] mb-8">
            René<br/>
            <span class="text-[#d4af37] italic">Arias</span>
          </h1>
          <p class="text-xl text-[#888888] max-w-xl leading-relaxed mb-10">
            I build software that scales and music that resonates. 
            This is where both worlds intersect.
          </p>
          <div class="flex flex-wrap gap-4">
            <a routerLink="/engineering" class="px-8 py-3 bg-[#d4af37] text-[#0a0a0a] font-semibold text-sm tracking-wider uppercase hover:bg-[#c9a227] transition-colors">
              See My Work
            </a>
            <a routerLink="/music" class="px-8 py-3 border border-[#7c3aed] text-[#7c3aed] font-semibold text-sm tracking-wider uppercase hover:bg-[#7c3aed] hover:text-white transition-colors">
              Hear My Music
            </a>
          </div>
        </div>
        
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span class="text-xs uppercase tracking-widest text-[#888888]">Scroll</span>
          <div class="w-px h-12 bg-gradient-to-b from-[#888888] to-transparent animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Manifesto -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">Manifesto</p>
          <blockquote class="font-display text-3xl md:text-4xl text-[#e8e8e8] leading-relaxed italic">
            "Precision in code, emotion in music — 
            both demand the same rigor and the same soul."
          </blockquote>
        </div>
      </div>
    </section>

    <!-- Engineering Section -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-3">Engineering</p>
            <h2 class="text-4xl font-bold text-[#e8e8e8]">Featured Work</h2>
          </div>
          <a routerLink="/engineering" class="text-sm text-[#888888] hover:text-[#d4af37] transition-colors uppercase tracking-wider">View All →</a>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          @for (project of featuredProjects; track project.title) {
            <div class="border border-[#1f1f1f] p-6 hover:border-[#d4af37]/30 transition-colors group">
              <div class="text-[#d4af37] text-xs uppercase tracking-widest mb-4">{{ project.status }}</div>
              <h3 class="text-[#e8e8e8] font-semibold text-lg mb-3 group-hover:text-[#d4af37] transition-colors">{{ project.title }}</h3>
              <p class="text-[#888888] text-sm leading-relaxed mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                @for (tech of project.technologies; track tech) {
                  <span class="text-xs text-[#888888] border border-[#1f1f1f] px-2 py-1">{{ tech }}</span>
                }
              </div>
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
            <p class="text-[#7c3aed] text-sm uppercase tracking-[0.3em] mb-3">Music</p>
            <h2 class="text-4xl font-bold text-[#e8e8e8]">Latest Releases</h2>
          </div>
          <a routerLink="/music" class="text-sm text-[#888888] hover:text-[#7c3aed] transition-colors uppercase tracking-wider">Discography →</a>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          @for (release of latestReleases; track release.title) {
            <div class="group">
              <div class="aspect-square bg-gradient-to-br from-[#7c3aed]/20 to-[#1f1f1f] mb-4 flex items-center justify-center">
                <div class="text-4xl">{{ release.emoji }}</div>
              </div>
              <p class="text-[#888888] text-xs uppercase tracking-widest mb-1">{{ release.type }} · {{ release.year }}</p>
              <h3 class="text-[#e8e8e8] font-semibold group-hover:text-[#7c3aed] transition-colors">{{ release.title }}</h3>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Writing Section -->
    <section class="py-24 px-6 border-t border-[#1f1f1f]">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-3">Writing</p>
            <h2 class="text-4xl font-bold text-[#e8e8e8]">Recent Articles</h2>
          </div>
          <a routerLink="/writing" class="text-sm text-[#888888] hover:text-[#d4af37] transition-colors uppercase tracking-wider">All Articles →</a>
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
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">Get In Touch</p>
        <h2 class="font-display text-5xl font-bold text-[#e8e8e8] mb-6">Let's Build Something</h2>
        <p class="text-[#888888] text-lg mb-10 max-w-md mx-auto">Whether it's a software project or a musical collaboration, I'm always open to interesting conversations.</p>
        <a routerLink="/contact" class="inline-block px-10 py-4 bg-[#d4af37] text-[#0a0a0a] font-bold tracking-widest uppercase hover:bg-[#c9a227] transition-colors">
          Say Hello
        </a>
      </div>
    </section>
  `,
})
export class HomeComponent {
  featuredProjects = [
    {
      status: 'Open Source',
      title: 'Nx Monorepo Starter',
      description: 'Production-ready Angular + NestJS monorepo template with SSR, testing, and CI/CD.',
      technologies: ['Angular', 'NestJS', 'Nx', 'TypeScript'],
    },
    {
      status: 'Production',
      title: 'Real-time Collaboration Engine',
      description: 'WebSocket-based collaboration system handling 10k+ concurrent users with CRDT conflict resolution.',
      technologies: ['Node.js', 'Redis', 'WebSockets', 'PostgreSQL'],
    },
    {
      status: 'Side Project',
      title: 'Music Production Tracker',
      description: 'Personal tool for tracking music projects, samples, and inspiration with AI-powered tagging.',
      technologies: ['Angular', 'Firebase', 'OpenAI', 'Tone.js'],
    },
  ];

  latestReleases = [
    { title: 'Interlude', type: 'EP', year: '2024', emoji: '🌙' },
    { title: 'Signal & Noise', type: 'Single', year: '2024', emoji: '⚡' },
    { title: 'Depth Charge', type: 'Album', year: '2023', emoji: '🌊' },
  ];

  recentArticles = [
    { date: 'Dec 2024', title: 'Building SSR Angular Apps That Actually Scale', excerpt: 'Lessons from taking an Angular SSR app to 100k monthly visitors.', readTime: 8 },
    { date: 'Nov 2024', title: 'The Discipline of Music Production as Software Engineering', excerpt: 'What I learned about systems thinking from making albums.', readTime: 6 },
    { date: 'Oct 2024', title: 'Why I Use Nx in Every Project Now', excerpt: 'After two years with Nx monorepos, here\'s an honest assessment.', readTime: 5 },
  ];
}
