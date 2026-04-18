import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-4xl mx-auto">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">{{ 'about.label' | translate }}</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-12">René Arias</h1>
        
        <div class="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <p class="text-[#888888] text-lg leading-relaxed mb-6">
              {{ 'about.bio_1' | translate }}
            </p>
            <p class="text-[#888888] text-lg leading-relaxed mb-6">
              {{ 'about.bio_2' | translate }}
            </p>
            <p class="text-[#888888] text-lg leading-relaxed">
              {{ 'about.bio_3' | translate }}
            </p>
          </div>
          <div class="space-y-8">
            <div>
              <h3 class="text-[#e8e8e8] font-semibold mb-4 uppercase tracking-wider text-sm">{{ 'about.engineering_skills' | translate }}</h3>
              <div class="space-y-2">
                @for (skill of engineeringSkills; track skill) {
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-[#d4af37]"></div>
                    <span class="text-[#888888] text-sm">{{ skill }}</span>
                  </div>
                }
              </div>
            </div>
            <div>
              <h3 class="text-[#e8e8e8] font-semibold mb-4 uppercase tracking-wider text-sm">{{ 'about.music_skills' | translate }}</h3>
              <div class="space-y-2">
                @for (skill of musicSkills; track skill) {
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-[#7c3aed]"></div>
                    <span class="text-[#888888] text-sm">{{ skill }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-[#1f1f1f] pt-16">
          <h2 class="text-2xl font-bold text-[#e8e8e8] mb-12">{{ 'about.timeline' | translate }}</h2>
          <div class="space-y-8">
            @for (event of timeline; track event.year) {
              <div class="flex gap-8">
                <span class="text-[#888888] text-sm w-16 shrink-0 pt-1">{{ event.year }}</span>
                <div class="flex-1 border-l border-[#1f1f1f] pl-8 pb-8">
                  <h3 class="text-[#e8e8e8] font-semibold mb-1">{{ event.title }}</h3>
                  <p class="text-[#888888] text-sm">{{ event.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="border-t border-[#1f1f1f] pt-12 mt-4">
          <a routerLink="/contact" class="inline-block px-8 py-3 bg-[#d4af37] text-[#0a0a0a] font-bold tracking-widest uppercase hover:bg-[#c9a227] transition-colors text-sm">
            {{ 'about.get_in_touch' | translate }}
          </a>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {
  engineeringSkills = [
    'TypeScript / JavaScript', 'Angular & React', 'Node.js / NestJS',
    'PostgreSQL / Redis', 'Docker / Kubernetes', 'System Architecture'
  ];

  musicSkills = [
    'Music Production (Ableton Live)', 'Guitar & Bass', 'Synthesis & Sound Design',
    'Mixing & Mastering', 'Songwriting', 'Session Recording'
  ];

  timeline = [
    { year: '2024', title: 'Launched renearias.com', description: 'Built this site as a unified home for engineering and music work.' },
    { year: '2023', title: 'Released "Depth Charge"', description: 'First full-length album — a year in the making across two continents.' },
    { year: '2022', title: 'Led Platform Engineering', description: 'Scaled backend infrastructure to support 1M+ daily active users.' },
    { year: '2020', title: 'Open Source Contributions', description: 'Started contributing to Nx and Angular ecosystem projects.' },
    { year: '2018', title: 'First Engineering Role', description: 'Joined startup as founding engineer, built product from 0 to 1.' },
    { year: '2015', title: 'Started Making Music', description: 'Bought first synthesizer. Haven\'t stopped since.' },
  ];
}
