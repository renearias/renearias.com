import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'engineering', loadComponent: () => import('./pages/engineering/engineering.component').then(m => m.EngineeringComponent) },
  { path: 'music', loadComponent: () => import('./pages/music/music.component').then(m => m.MusicComponent) },
  { path: 'writing', loadComponent: () => import('./pages/writing/writing.component').then(m => m.WritingComponent) },
  { path: 'lab', loadComponent: () => import('./pages/lab/lab.component').then(m => m.LabComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
