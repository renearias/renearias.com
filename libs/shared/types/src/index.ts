export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  publishedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export interface Release {
  id: string;
  title: string;
  slug: string;
  type: 'album' | 'ep' | 'single';
  releaseDate: string;
  coverArt?: string;
  streamingLinks: { platform: string; url: string }[];
  tracklist: { trackNumber: number; title: string; duration: string }[];
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  url: string;
  thumbnail?: string;
  description: string;
  publishedAt: string;
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  publishedAt: string;
}

export interface FeaturedContent {
  articles: Article[];
  projects: Project[];
  releases: Release[];
}
