import { Route } from '@angular/router';
import { SeoConfig } from 'seo';

const BASE_URL = 'https://renearias.com';
const OG_IMAGE = `${BASE_URL}/images/og-renearias.png`;

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: 'René Arias — Software Engineer & Music Artist',
        description: 'Senior software engineer building scalable systems and electronic music artist. Angular, TypeScript, Node.js expert available for high-impact projects.',
        ogTitle: 'René Arias — Engineer. Creator. Artist.',
        ogDescription: 'I build robust software systems by day and produce electronic music by night. Explore my work and let\'s create something exceptional.',
        ogImage: OG_IMAGE,
        ogUrl: BASE_URL,
        alternates: [
          { hreflang: 'en', href: `${BASE_URL}/?lang=en` },
          { hreflang: 'es', href: `${BASE_URL}/?lang=es` },
          { hreflang: 'x-default', href: BASE_URL },
        ],
      } satisfies SeoConfig,
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: {
      seo: {
        title: 'About René Arias — Engineer, Creator & Artist',
        description: 'Meet René Arias — software engineer with 10+ years shipping production systems and an electronic music artist. Explore the story behind the work.',
        ogTitle: 'About René Arias',
        ogDescription: 'Software engineer. Electronic music artist. Discover the story, skills, and journey behind the work.',
        ogImage: OG_IMAGE,
        ogUrl: `${BASE_URL}/about`,
        alternates: [
          { hreflang: 'en', href: `${BASE_URL}/about?lang=en` },
          { hreflang: 'es', href: `${BASE_URL}/about?lang=es` },
          { hreflang: 'x-default', href: `${BASE_URL}/about` },
        ],
      } satisfies SeoConfig,
    },
  },
  {
    path: 'engineering',
    loadComponent: () => import('./pages/engineering/engineering.component').then(m => m.EngineeringComponent),
    data: {
      seo: {
        title: 'Engineering — René Arias | Angular, TypeScript & Node.js',
        description: 'Case studies and open-source projects by René Arias. Scalable architectures, Angular SSR apps, and tools built to last. Available for senior engineering roles.',
        ogTitle: 'Engineering Work by René Arias',
        ogDescription: 'From scaling platforms to 1M daily users to open-source libraries — explore the systems and tools I\'ve built with Angular, TypeScript, and Node.js.',
        ogImage: OG_IMAGE,
        ogUrl: `${BASE_URL}/engineering`,
        alternates: [
          { hreflang: 'en', href: `${BASE_URL}/engineering?lang=en` },
          { hreflang: 'es', href: `${BASE_URL}/engineering?lang=es` },
          { hreflang: 'x-default', href: `${BASE_URL}/engineering` },
        ],
      } satisfies SeoConfig,
    },
  },
  {
    path: 'music',
    loadComponent: () => import('./pages/music/music.component').then(m => m.MusicComponent),
    data: {
      seo: {
        title: 'Music — René Arias | Electronic Artist & Producer',
        description: 'Explore the discography of René Arias — electronic music producer blending technology and creativity. Stream singles, EPs, and albums now.',
        ogTitle: 'Music by René Arias',
        ogDescription: 'Electronic music where precision meets emotion. Stream the latest releases from René Arias on Spotify and all major platforms.',
        ogImage: OG_IMAGE,
        ogUrl: `${BASE_URL}/music`,
        alternates: [
          { hreflang: 'en', href: `${BASE_URL}/music?lang=en` },
          { hreflang: 'es', href: `${BASE_URL}/music?lang=es` },
          { hreflang: 'x-default', href: `${BASE_URL}/music` },
        ],
      } satisfies SeoConfig,
    },
  },
  {
    path: 'writing',
    loadComponent: () => import('./pages/writing/writing.component').then(m => m.WritingComponent),
    data: {
      seo: {
        title: 'Writing — René Arias | Engineering & Creative Process',
        description: 'Practical articles on Angular, TypeScript, system architecture, and the intersection of software engineering and music production by René Arias.',
        ogTitle: 'Writing by René Arias',
        ogDescription: 'Deep dives into Angular, TypeScript, software architecture, and creative process. Built from real production experience.',
        ogImage: OG_IMAGE,
        ogUrl: `${BASE_URL}/writing`,
        alternates: [
          { hreflang: 'en', href: `${BASE_URL}/writing?lang=en` },
          { hreflang: 'es', href: `${BASE_URL}/writing?lang=es` },
          { hreflang: 'x-default', href: `${BASE_URL}/writing` },
        ],
      } satisfies SeoConfig,
    },
  },
  {
    path: 'lab',
    loadComponent: () => import('./pages/lab/lab.component').then(m => m.LabComponent),
    data: {
      seo: {
        title: 'Lab — René Arias | Experiments & Side Projects',
        description: 'Creative experiments and side projects by René Arias — where engineering meets art. Interactive prototypes, generative tools, and unconventional builds.',
        ogTitle: 'The Lab — René Arias',
        ogDescription: 'A space for experiments. Interactive prototypes, generative tools, and projects that live outside the portfolio.',
        ogImage: OG_IMAGE,
        ogUrl: `${BASE_URL}/lab`,
      } satisfies SeoConfig,
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: {
      seo: {
        title: 'Contact René Arias — Let\'s Work Together',
        description: 'Ready to collaborate? Hire René Arias for senior engineering, architecture consulting, or creative projects. Reach out and let\'s build something great.',
        ogTitle: 'Work with René Arias',
        ogDescription: 'Available for senior engineering roles, consulting engagements, and creative collaborations. Let\'s connect.',
        ogImage: OG_IMAGE,
        ogUrl: `${BASE_URL}/contact`,
        alternates: [
          { hreflang: 'en', href: `${BASE_URL}/contact?lang=en` },
          { hreflang: 'es', href: `${BASE_URL}/contact?lang=es` },
          { hreflang: 'x-default', href: `${BASE_URL}/contact` },
        ],
      } satisfies SeoConfig,
    },
  },
  { path: '**', redirectTo: '' },
];
