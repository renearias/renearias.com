import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <p class="text-[#7c3aed] text-sm uppercase tracking-[0.3em] mb-6">Music</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-4">Discography</h1>
        <p class="text-[#888888] text-xl max-w-2xl mb-16">Ambient, electronic, and song-based music exploring the intersection of technology and human experience.</p>

        <div class="space-y-16">
          @for (release of releases; track release.title) {
            <div class="border border-[#1f1f1f] p-8">
              <div class="grid md:grid-cols-3 gap-8">
                <div class="aspect-square bg-gradient-to-br from-[#7c3aed]/20 to-[#1f1f1f] flex items-center justify-center">
                  <span class="text-6xl">{{ release.emoji }}</span>
                </div>
                <div class="md:col-span-2">
                  <p class="text-[#7c3aed] text-xs uppercase tracking-widest mb-2">{{ release.type }} · {{ release.year }}</p>
                  <h2 class="text-[#e8e8e8] text-3xl font-bold mb-4">{{ release.title }}</h2>
                  <p class="text-[#888888] mb-6">{{ release.description }}</p>
                  
                  <div class="mb-6">
                    <p class="text-[#888888] text-xs uppercase tracking-wider mb-3">Tracklist</p>
                    <div class="space-y-2">
                      @for (track of release.tracklist; track track.number) {
                        <div class="flex justify-between items-center py-2 border-b border-[#1f1f1f]">
                          <div class="flex items-center gap-4">
                            <span class="text-[#888888] text-sm w-6">{{ track.number }}</span>
                            <span class="text-[#e8e8e8] text-sm">{{ track.title }}</span>
                          </div>
                          <span class="text-[#888888] text-sm">{{ track.duration }}</span>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-3">
                    @for (link of release.streamingLinks; track link.platform) {
                      <a [href]="link.url" target="_blank" class="px-4 py-2 border border-[#7c3aed] text-[#7c3aed] text-xs uppercase tracking-wider hover:bg-[#7c3aed] hover:text-white transition-colors">
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
  releases = [
    {
      title: 'Interlude',
      type: 'EP',
      year: '2024',
      emoji: '🌙',
      description: 'A five-track exploration of liminal spaces — the moments between tasks, between thoughts, between sleep and waking.',
      tracklist: [
        { number: 1, title: 'Threshold', duration: '4:12' },
        { number: 2, title: 'Render Loop', duration: '3:45' },
        { number: 3, title: 'Half-Light', duration: '5:33' },
        { number: 4, title: 'Background Process', duration: '3:58' },
        { number: 5, title: 'Exit Code 0', duration: '6:07' },
      ],
      streamingLinks: [
        { platform: 'Spotify', url: 'https://open.spotify.com' },
        { platform: 'Apple Music', url: 'https://music.apple.com' },
        { platform: 'SoundCloud', url: 'https://soundcloud.com' },
        { platform: 'Bandcamp', url: 'https://bandcamp.com' },
      ],
    },
    {
      title: 'Signal & Noise',
      type: 'Single',
      year: '2024',
      emoji: '⚡',
      description: 'A meditation on filtering signal from noise in an age of information overload.',
      tracklist: [
        { number: 1, title: 'Signal & Noise', duration: '4:30' },
        { number: 2, title: 'Signal & Noise (Instrumental)', duration: '4:30' },
      ],
      streamingLinks: [
        { platform: 'Spotify', url: 'https://open.spotify.com' },
        { platform: 'Apple Music', url: 'https://music.apple.com' },
      ],
    },
    {
      title: 'Depth Charge',
      type: 'Album',
      year: '2023',
      emoji: '🌊',
      description: 'A full-length album about going deep — deep work, deep water, deep feeling. Recorded over 12 months across two continents.',
      tracklist: [
        { number: 1, title: 'Dive', duration: '1:22' },
        { number: 2, title: 'Pressure System', duration: '4:55' },
        { number: 3, title: 'Bioluminescence', duration: '5:12' },
        { number: 4, title: 'Current', duration: '3:47' },
        { number: 5, title: 'Abyssal', duration: '7:33' },
        { number: 6, title: 'Thermocline', duration: '4:18' },
        { number: 7, title: 'Surface', duration: '5:04' },
        { number: 8, title: 'Breathe', duration: '3:22' },
      ],
      streamingLinks: [
        { platform: 'Spotify', url: 'https://open.spotify.com' },
        { platform: 'Apple Music', url: 'https://music.apple.com' },
        { platform: 'SoundCloud', url: 'https://soundcloud.com' },
        { platform: 'Bandcamp', url: 'https://bandcamp.com' },
        { platform: 'YouTube', url: 'https://youtube.com' },
      ],
    },
  ];
}
