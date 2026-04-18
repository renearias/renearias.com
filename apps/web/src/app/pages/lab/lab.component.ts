import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">{{ 'lab.label' | translate }}</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-4">{{ 'lab.heading' | translate }}</h1>
        <p class="text-[#888888] text-xl max-w-2xl mb-16">{{ 'lab.subheading' | translate }}</p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (experiment of experiments; track experiment.title) {
            <div class="border border-[#1f1f1f] p-6 hover:border-[#d4af37]/30 transition-colors group">
              <div class="text-4xl mb-4">{{ experiment.emoji }}</div>
              <div class="text-[#888888] text-xs uppercase tracking-widest mb-2">{{ experiment.status }}</div>
              <h3 class="text-[#e8e8e8] font-semibold text-lg mb-3 group-hover:text-[#d4af37] transition-colors">{{ experiment.title }}</h3>
              <p class="text-[#888888] text-sm leading-relaxed mb-4">{{ experiment.description }}</p>
              <div class="flex flex-wrap gap-2">
                @for (tech of experiment.technologies; track tech) {
                  <span class="text-xs text-[#888888] border border-[#1f1f1f] px-2 py-1">{{ tech }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class LabComponent {
  experiments = [
    {
      emoji: '🎛️',
      status: 'Active',
      title: 'WebAudio Sequencer',
      description: 'Browser-based step sequencer built with the Web Audio API. 16-step, 4-track, runs in any browser.',
      technologies: ['TypeScript', 'Web Audio API', 'Canvas'],
    },
    {
      emoji: '🧠',
      status: 'Prototype',
      title: 'AI Lyrics Assistant',
      description: 'GPT-powered tool for exploring lyrical themes and rhyme schemes.',
      technologies: ['OpenAI', 'Angular', 'Node.js'],
    },
    {
      emoji: '📊',
      status: 'Active',
      title: 'Nx Build Analyzer',
      description: 'Dashboard for visualizing Nx project graphs and identifying optimization opportunities.',
      technologies: ['Angular', 'D3.js', 'Nx Devkit'],
    },
    {
      emoji: '🎨',
      status: 'Archived',
      title: 'Generative Album Art',
      description: 'p5.js sketch that generates unique album covers from audio analysis data.',
      technologies: ['p5.js', 'Web Audio API', 'Canvas'],
    },
    {
      emoji: '🔐',
      status: 'Prototype',
      title: 'Passkey Auth Demo',
      description: 'Minimal demo of WebAuthn passkey authentication with NestJS backend.',
      technologies: ['WebAuthn', 'NestJS', 'Angular'],
    },
    {
      emoji: '🌡️',
      status: 'Archived',
      title: 'Personal Dashboard',
      description: 'Raspberry Pi-powered ambient display showing metrics, weather, and upcoming calendar events.',
      technologies: ['Raspberry Pi', 'Python', 'React'],
    },
  ];
}
