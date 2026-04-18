import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-6xl mx-auto">

        <!-- Artist header with profile image -->
        <div class="flex items-center gap-6 mb-16">
          <img src="images/rene-arias-logo.png" alt="Rene Arias" class="w-20 h-20 rounded-full object-cover border-2 border-[#7c3aed]" />
          <div>
            <p class="text-[#7c3aed] text-sm uppercase tracking-[0.3em] mb-1">{{ 'music.label' | translate }}</p>
            <h1 class="font-display text-5xl font-bold text-[#e8e8e8]">Rene Arias</h1>
            <p class="text-[#888888] mt-1">{{ 'music.artist_tagline' | translate }}</p>
          </div>
        </div>

        <!-- Spotify embed banner -->
        <div class="mb-16">
          <iframe
            src="https://open.spotify.com/embed/artist/7JuFyZNcqfFZDbNtK79K1F"
            width="100%"
            height="152"
            frameBorder="0"
            allowfullscreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            class="rounded-lg">
          </iframe>
        </div>

        <div class="space-y-8">
          @for (release of releases; track release.title) {
            <div class="border border-[#1f1f1f] p-6 hover:border-[#7c3aed]/40 transition-colors">
              <div class="flex gap-6">
                <a [href]="release.links[0].url" target="_blank" rel="noopener noreferrer" class="flex-shrink-0">
                  <img [src]="release.coverArt" [alt]="release.title + ' cover'" class="w-24 h-24 object-cover" />
                </a>
                <div class="flex-1 min-w-0">
                  <p class="text-[#7c3aed] text-xs uppercase tracking-widest mb-1">{{ release.type }} · {{ release.year }}</p>
                  <h2 class="text-[#e8e8e8] text-2xl font-bold mb-1 truncate">{{ release.title }}</h2>
                  <p class="text-[#888888] text-sm mb-4">{{ release.duration }}</p>
                  <div class="flex flex-wrap gap-2">
                    @for (link of release.links; track link.platform) {
                      <a [href]="link.url" target="_blank" rel="noopener noreferrer"
                         [style.background-color]="link.bg"
                         [style.color]="link.color"
                         [style.border-color]="link.border || 'transparent'"
                         class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-opacity hover:opacity-80"
                         [title]="'Escuchar en ' + link.platform">
                        <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path [attr.d]="link.icon" fill="currentColor"/>
                        </svg>
                        {{ link.platform }}
                      </a>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class MusicComponent {
  readonly spotifyIcon = 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z';
  readonly deezerIcon = 'M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.03h5.19V8.38H6.27zm6.27 0v3.03h5.19V8.38h-5.19zm6.27 0v3.03H24V8.38h-5.19zM6.27 12.6v3.04h5.19V12.6H6.27zm6.27 0v3.04h5.19V12.6h-5.19zm6.27 0v3.04H24V12.6h-5.19zM0 16.84v3.03h5.19v-3.03H0zm6.27 0v3.03h5.19v-3.03H6.27zm6.27 0v3.03h5.19v-3.03h-5.19zm6.27 0v3.03H24v-3.03h-5.19z';
  readonly appleMusicIcon = 'M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.627.06 1.254.073 1.88.073h11.496c.552 0 1.1-.01 1.648-.065.824-.08 1.62-.229 2.35-.665 1.34-.789 2.17-1.948 2.484-3.494.119-.577.155-1.164.164-1.754.007-.38.01-.758.01-1.137V7.096c-.003-.325-.003-.65-.003-.972zM12 19.5c-4.142 0-7.5-3.357-7.5-7.5S7.858 4.5 12 4.5s7.5 3.357 7.5 7.5-3.358 7.5-7.5 7.5zm0-12.3a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.8a3 3 0 110-6 3 3 0 010 6zm6.906-8.204a1.74 1.74 0 11-3.48 0 1.74 1.74 0 013.48 0z';
  readonly youtubeMusicIcon = 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507 0-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z';

  releases = [
    {
      title: 'La Reina',
      type: 'Single',
      year: '2026',
      duration: '3 min 39 seg',
      coverArt: 'images/la-reina.jpg',
      links: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/1z6cPUvErtpQVGwFY6yDKI', bg: '#1DB954', color: '#000', border: '', icon: this.spotifyIcon },
        { platform: 'Apple Music', url: 'https://music.apple.com/us/album/la-reina/1889985999?i=1889986380', bg: '#fc3c44', color: '#fff', border: '', icon: this.appleMusicIcon },
        { platform: 'YouTube Music', url: 'https://music.youtube.com/watch?v=idC8tWqSo9E', bg: '#FF0000', color: '#fff', border: '', icon: this.youtubeMusicIcon },
        { platform: 'Deezer', url: 'https://www.deezer.com/us/album/952642151', bg: '#A238FF', color: '#fff', border: '', icon: this.deezerIcon },
      ],
    },
    {
      title: 'La Oveja Que Era Lobo',
      type: 'Single',
      year: '2026',
      duration: '3 min 12 seg',
      coverArt: 'images/la-oveja-que-era-lobo.jpg',
      links: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/76gF5RrkLNza1BMWYqo63P', bg: '#1DB954', color: '#000', border: '', icon: this.spotifyIcon },
        { platform: 'Apple Music', url: 'https://music.apple.com/us/album/la-oveja-que-era-lobo/1890098104?i=1890099156', bg: '#fc3c44', color: '#fff', border: '', icon: this.appleMusicIcon },
        { platform: 'YouTube Music', url: 'https://music.youtube.com/watch?v=QhRjB9YBRU0', bg: '#FF0000', color: '#fff', border: '', icon: this.youtubeMusicIcon },
        { platform: 'Deezer', url: 'https://www.deezer.com/us/album/952904261', bg: '#A238FF', color: '#fff', border: '', icon: this.deezerIcon },
      ],
    },
    {
      title: 'Corazon De Hielo',
      type: 'Single',
      year: '2026',
      duration: '3 min 42 seg',
      coverArt: 'images/corazon-de-hielo.jpg',
      links: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/5sT8rKCnjSO5wXhb9NMA90', bg: '#1DB954', color: '#000', border: '', icon: this.spotifyIcon },
        { platform: 'Apple Music', url: 'https://music.apple.com/us/album/coraz%C3%B3n-de-hielo/1889760880?i=1889760883', bg: '#fc3c44', color: '#fff', border: '', icon: this.appleMusicIcon },
        { platform: 'YouTube Music', url: 'https://music.youtube.com/watch?v=KcAr_UkqNco', bg: '#FF0000', color: '#fff', border: '', icon: this.youtubeMusicIcon },
        { platform: 'Deezer', url: 'https://www.deezer.com/us/album/952095551', bg: '#A238FF', color: '#fff', border: '', icon: this.deezerIcon },
      ],
    },
    {
      title: 'Circular',
      type: 'Single',
      year: '2026',
      duration: '3 min 3 seg',
      coverArt: 'images/circular.jpg',
      links: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/73Rw3rTW5ha77i5rPlMtfC', bg: '#1DB954', color: '#000', border: '', icon: this.spotifyIcon },
        { platform: 'Apple Music', url: 'https://music.apple.com/us/album/circular/1889987345?i=1889987348', bg: '#fc3c44', color: '#fff', border: '', icon: this.appleMusicIcon },
        { platform: 'YouTube Music', url: 'https://music.youtube.com/watch?v=LADIp0ngmzk', bg: '#FF0000', color: '#fff', border: '', icon: this.youtubeMusicIcon },
        { platform: 'Deezer', url: 'https://www.deezer.com/us/album/952641501', bg: '#A238FF', color: '#fff', border: '', icon: this.deezerIcon },
      ],
    },
    {
      title: 'Gracias Otra Vez',
      type: 'Single',
      year: '2026',
      duration: '4 min 9 seg',
      coverArt: 'images/gracias-otra-vez.jpg',
      links: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/7LNDP8uRWsG5aGLm81SdfG', bg: '#1DB954', color: '#000', border: '', icon: this.spotifyIcon },
        { platform: 'Apple Music', url: 'https://music.apple.com/us/album/gracias-otra-vez/1889768943?i=1889768946', bg: '#fc3c44', color: '#fff', border: '', icon: this.appleMusicIcon },
        { platform: 'YouTube Music', url: 'https://music.youtube.com/watch?v=dK1URugq42Y', bg: '#FF0000', color: '#fff', border: '', icon: this.youtubeMusicIcon },
        { platform: 'Deezer', url: 'https://www.deezer.com/us/album/952107531', bg: '#A238FF', color: '#fff', border: '', icon: this.deezerIcon },
      ],
    },
    {
      title: 'Pasion Por Contrato',
      type: 'Single',
      year: '2026',
      duration: '4 min 16 seg',
      coverArt: 'images/pasion-por-contrato.jpg',
      links: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/1BfXjJAczyQKlkUfdQC4sw', bg: '#1DB954', color: '#000', border: '', icon: this.spotifyIcon },
        { platform: 'Apple Music', url: 'https://music.apple.com/us/album/pasi%C3%B3n-por-contrato/1870725217?i=1870725219', bg: '#fc3c44', color: '#fff', border: '', icon: this.appleMusicIcon },
        { platform: 'YouTube Music', url: 'https://music.youtube.com/watch?v=bzcmjRl7xIg', bg: '#FF0000', color: '#fff', border: '', icon: this.youtubeMusicIcon },
        { platform: 'Deezer', url: 'https://www.deezer.com/us/album/901703202', bg: '#A238FF', color: '#fff', border: '', icon: this.deezerIcon },
      ],
    },
  ];
}
