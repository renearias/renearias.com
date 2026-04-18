import { Component, signal, computed } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">{{ 'writing.label' | translate }}</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-4">{{ 'writing.heading' | translate }}</h1>
        <p class="text-[#888888] text-xl max-w-2xl mb-12">{{ 'writing.subheading' | translate }}</p>

        <div class="flex flex-wrap gap-3 mb-12">
          <button 
            (click)="setTag(null)"
            [style.background-color]="activeTag() === null ? '#d4af37' : 'transparent'"
            [style.color]="activeTag() === null ? '#0a0a0a' : '#888888'"
            [style.border]="activeTag() !== null ? '1px solid #1f1f1f' : 'none'"
            class="px-4 py-2 text-xs uppercase tracking-wider transition-colors">
            {{ 'writing.all' | translate }}
          </button>
          @for (tag of allTags; track tag) {
            <button 
              (click)="setTag(tag)"
              [style.background-color]="activeTag() === tag ? '#d4af37' : 'transparent'"
              [style.color]="activeTag() === tag ? '#0a0a0a' : '#888888'"
              [style.border]="activeTag() !== tag ? '1px solid #1f1f1f' : 'none'"
              class="px-4 py-2 text-xs uppercase tracking-wider transition-colors">
              {{ tag }}
            </button>
          }
        </div>

        <div class="space-y-1">
          @for (article of filteredArticles(); track article.title) {
            <div class="flex items-start gap-6 py-6 border-b border-[#1f1f1f] group cursor-pointer hover:pl-2 transition-all">
              <div class="text-[#888888] text-sm w-28 shrink-0 pt-1">
                <div>{{ article.date }}</div>
                <div class="text-xs mt-1">{{ article.readTime }} min</div>
              </div>
              <div class="flex-1">
                <h3 class="text-[#e8e8e8] font-medium mb-2 group-hover:text-[#d4af37] transition-colors text-lg">{{ article.title }}</h3>
                <p class="text-[#888888] text-sm mb-3">{{ article.excerpt }}</p>
                <div class="flex flex-wrap gap-2">
                  @for (tag of article.tags; track tag) {
                    <span class="text-xs text-[#888888] border border-[#1f1f1f] px-2 py-0.5">{{ tag }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class WritingComponent {
  activeTag = signal<string | null>(null);

  articles = [
    {
      date: 'Dec 2024',
      title: 'Building SSR Angular Apps That Actually Scale',
      excerpt: 'Lessons from taking an Angular SSR app from proof-of-concept to 100k monthly visitors.',
      tags: ['Engineering', 'Angular', 'Performance'],
      readTime: 8,
    },
    {
      date: 'Nov 2024',
      title: 'The Discipline of Music Production as Software Engineering',
      excerpt: 'What I learned about systems thinking, iteration, and finishing from making albums.',
      tags: ['Music', 'Process', 'Creativity'],
      readTime: 6,
    },
    {
      date: 'Oct 2024',
      title: 'Why I Use Nx in Every Project Now',
      excerpt: 'After two years building with Nx monorepos, an honest assessment of tradeoffs.',
      tags: ['Engineering', 'Nx', 'Monorepo'],
      readTime: 5,
    },
    {
      date: 'Sep 2024',
      title: 'Ambient Music and Deep Work: An Unexpected Partnership',
      excerpt: 'How ambient music became an unexpected tool for sustained engineering focus.',
      tags: ['Music', 'Productivity'],
      readTime: 4,
    },
    {
      date: 'Aug 2024',
      title: 'TypeScript Patterns I Wish I Had Known Earlier',
      excerpt: 'Practical patterns for making TypeScript work harder for you.',
      tags: ['Engineering', 'TypeScript'],
      readTime: 7,
    },
    {
      date: 'Jul 2024',
      title: 'On Finishing Things',
      excerpt: 'The hardest part of any creative or engineering project is knowing when to ship.',
      tags: ['Process', 'Creativity'],
      readTime: 3,
    },
  ];

  allTags = [...new Set(this.articles.flatMap(a => a.tags))];

  filteredArticles = computed(() => {
    const tag = this.activeTag();
    if (!tag) return this.articles;
    return this.articles.filter(a => a.tags.includes(tag));
  });

  setTag(tag: string | null) {
    this.activeTag.set(tag);
  }
}
