import type { Article, Project, Release } from 'types';

export const articles: Article[] = [
  {
    id: '1',
    title: 'Building SSR Angular Apps That Actually Scale',
    slug: 'building-ssr-angular-apps-that-scale',
    excerpt: 'Lessons from taking an Angular SSR app to 100k monthly visitors.',
    content: 'Full content here...',
    tags: ['Engineering', 'Angular', 'Performance'],
    publishedAt: '2024-12-01',
    readingTime: 8,
  },
  {
    id: '2',
    title: 'The Discipline of Music Production as Software Engineering',
    slug: 'music-production-as-software-engineering',
    excerpt: 'What I learned about systems thinking from making albums.',
    content: 'Full content here...',
    tags: ['Music', 'Process', 'Creativity'],
    publishedAt: '2024-11-01',
    readingTime: 6,
  },
  {
    id: '3',
    title: 'Why I Use Nx in Every Project Now',
    slug: 'why-i-use-nx',
    excerpt: 'After two years with Nx monorepos, an honest assessment.',
    content: 'Full content here...',
    tags: ['Engineering', 'Nx', 'Monorepo'],
    publishedAt: '2024-10-01',
    readingTime: 5,
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'renearias.com',
    slug: 'renearias-com',
    description: 'Source code for this site — Angular SSR frontend, NestJS API, and Nx monorepo deployed on Firebase.',
    technologies: ['Angular', 'NestJS', 'Nx', 'TypeScript', 'Firebase'],
    repoUrl: 'https://github.com/renearias/renearias.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Arxis',
    slug: 'arxis',
    description: 'Angular utilities for Firebase authentication and Firestore — auth facades, typed helpers, and RxJS integration.',
    technologies: ['Angular', 'Firebase', 'TypeScript', 'RxJS'],
    repoUrl: 'https://github.com/renearias/arxis',
    featured: true,
  },
];

export const releases: Release[] = [
  {
    id: '1',
    title: 'Interlude',
    slug: 'interlude',
    type: 'ep',
    releaseDate: '2024-06-01',
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
    ],
    tracklist: [
      { trackNumber: 1, title: 'Threshold', duration: '4:12' },
      { trackNumber: 2, title: 'Render Loop', duration: '3:45' },
      { trackNumber: 3, title: 'Half-Light', duration: '5:33' },
    ],
  },
  {
    id: '2',
    title: 'Depth Charge',
    slug: 'depth-charge',
    type: 'album',
    releaseDate: '2023-09-15',
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    tracklist: [
      { trackNumber: 1, title: 'Dive', duration: '1:22' },
      { trackNumber: 2, title: 'Pressure System', duration: '4:55' },
      { trackNumber: 3, title: 'Bioluminescence', duration: '5:12' },
    ],
  },
];
