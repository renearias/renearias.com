import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-[#1f1f1f] bg-[#0a0a0a] py-12 mt-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p class="text-[#e8e8e8] font-bold text-lg mb-2">René Arias</p>
            <p class="text-[#888888] text-sm max-w-xs">Software engineer &amp; music artist. Building thoughtful software and honest music.</p>
          </div>
          <div class="flex gap-12 text-sm">
            <div>
              <p class="text-[#888888] uppercase tracking-wider text-xs mb-3">Work</p>
              <ul class="space-y-2">
                <li><a routerLink="/engineering" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">Engineering</a></li>
                <li><a routerLink="/writing" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">Writing</a></li>
                <li><a routerLink="/lab" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">Lab</a></li>
              </ul>
            </div>
            <div>
              <p class="text-[#888888] uppercase tracking-wider text-xs mb-3">Music</p>
              <ul class="space-y-2">
                <li><a routerLink="/music" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">Releases</a></li>
                <li><a href="https://open.spotify.com" target="_blank" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">Spotify</a></li>
                <li><a href="https://soundcloud.com" target="_blank" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">SoundCloud</a></li>
              </ul>
            </div>
            <div>
              <p class="text-[#888888] uppercase tracking-wider text-xs mb-3">Connect</p>
              <ul class="space-y-2">
                <li><a href="https://github.com/renearias" target="_blank" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">GitHub</a></li>
                <li><a href="https://linkedin.com/in/renearias" target="_blank" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">LinkedIn</a></li>
                <li><a routerLink="/contact" class="text-[#888888] hover:text-[#e8e8e8] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-t border-[#1f1f1f] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-[#888888] text-sm">© 2024 René Arias. All rights reserved.</p>
          <p class="text-[#888888] text-xs">Built with Angular, NestJS &amp; Nx</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
