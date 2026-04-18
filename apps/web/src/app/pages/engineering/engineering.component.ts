import { Component } from '@angular/core';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">Engineering</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-4">Building Things</h1>
        <p class="text-[#888888] text-xl max-w-2xl mb-16">Scalable systems, open source tools, and the occasional experiment that escapes into production.</p>

        <div class="mb-20">
          <h2 class="text-[#e8e8e8] font-semibold mb-8 uppercase tracking-wider text-sm">Case Studies</h2>
          <div class="space-y-6">
            @for (study of caseStudies; track study.title) {
              <div class="border border-[#1f1f1f] p-8 hover:border-[#d4af37]/30 transition-colors">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <span class="text-[#d4af37] text-xs uppercase tracking-widest">{{ study.category }}</span>
                    <h3 class="text-[#e8e8e8] text-xl font-semibold mt-2">{{ study.title }}</h3>
                  </div>
                  <span class="text-[#888888] text-sm">{{ study.year }}</span>
                </div>
                <p class="text-[#888888] mb-4">{{ study.description }}</p>
                <div class="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p class="text-[#888888] text-xs uppercase tracking-wider mb-1">Challenge</p>
                    <p class="text-[#e8e8e8] text-sm">{{ study.challenge }}</p>
                  </div>
                  <div>
                    <p class="text-[#888888] text-xs uppercase tracking-wider mb-1">Solution</p>
                    <p class="text-[#e8e8e8] text-sm">{{ study.solution }}</p>
                  </div>
                  <div>
                    <p class="text-[#888888] text-xs uppercase tracking-wider mb-1">Impact</p>
                    <p class="text-[#e8e8e8] text-sm">{{ study.impact }}</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  @for (tech of study.technologies; track tech) {
                    <span class="text-xs text-[#888888] border border-[#1f1f1f] px-2 py-1">{{ tech }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <div>
          <h2 class="text-[#e8e8e8] font-semibold mb-8 uppercase tracking-wider text-sm">Projects</h2>
          <div class="grid md:grid-cols-2 gap-6">
            @for (project of projects; track project.title) {
              <div class="border border-[#1f1f1f] p-6 hover:border-[#d4af37]/30 transition-colors group">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-[#e8e8e8] font-semibold group-hover:text-[#d4af37] transition-colors">{{ project.title }}</h3>
                  <div class="flex gap-3">
                    @if (project.repoUrl) {
                      <a [href]="project.repoUrl" target="_blank" class="text-[#888888] hover:text-[#e8e8e8] text-xs uppercase tracking-wider">GitHub</a>
                    }
                    @if (project.demoUrl) {
                      <a [href]="project.demoUrl" target="_blank" class="text-[#d4af37] text-xs uppercase tracking-wider">Demo</a>
                    }
                  </div>
                </div>
                <p class="text-[#888888] text-sm mb-4">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="text-xs text-[#888888] border border-[#1f1f1f] px-2 py-1">{{ tech }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EngineeringComponent {
  caseStudies = [
    {
      category: 'Platform Engineering',
      title: 'Scaling to 1M Daily Active Users',
      year: '2022',
      description: 'Led the architectural overhaul of a consumer platform from a monolith to event-driven microservices.',
      challenge: 'Monolith bottlenecks causing 40% error rates during peak traffic.',
      solution: 'Decomposed into 12 microservices with Kafka event streaming and Redis caching.',
      impact: '99.9% uptime, 60% reduction in p99 latency, 10x throughput.',
      technologies: ['Node.js', 'Kafka', 'Redis', 'PostgreSQL', 'Kubernetes', 'Terraform'],
    },
    {
      category: 'Developer Experience',
      title: 'Monorepo Migration for 40-Engineer Org',
      year: '2023',
      description: 'Designed and executed migration of 15 separate repositories into a single Nx monorepo.',
      challenge: 'Fragmented codebases causing 3-hour CI pipelines and shared code duplication.',
      solution: 'Nx workspace with affected builds, shared libraries, and standardized tooling.',
      impact: 'CI time dropped from 3h to 12min. Onboarding time halved.',
      technologies: ['Nx', 'TypeScript', 'GitHub Actions', 'Angular', 'NestJS'],
    },
  ];

  projects = [
    {
      title: 'Nx Monorepo Starter',
      description: 'Production-ready Angular + NestJS monorepo template with SSR, testing, and CI/CD baked in.',
      technologies: ['Angular', 'NestJS', 'Nx', 'TypeScript', 'Jest'],
      repoUrl: 'https://github.com/renearias/nx-starter',
      demoUrl: null,
    },
    {
      title: 'Real-time Collaboration Engine',
      description: 'WebSocket-based system for real-time document collaboration with CRDT conflict resolution.',
      technologies: ['Node.js', 'Redis', 'WebSockets', 'CRDT'],
      repoUrl: 'https://github.com/renearias/collab-engine',
      demoUrl: null,
    },
    {
      title: 'Music Production Tracker',
      description: 'Personal tool for tracking music projects, samples, and creative inspiration.',
      technologies: ['Angular', 'Firebase', 'OpenAI', 'Tone.js'],
      repoUrl: null,
      demoUrl: 'https://tracker.renearias.com',
    },
    {
      title: 'CLI Dev Tools',
      description: 'Collection of shell scripts and Node.js CLIs for automating common development workflows.',
      technologies: ['Node.js', 'Shell', 'Commander.js'],
      repoUrl: 'https://github.com/renearias/dev-tools',
      demoUrl: null,
    },
  ];
}
