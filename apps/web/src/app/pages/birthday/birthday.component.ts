import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-birthday',
  standalone: true,
  styleUrl: './birthday.component.css',
  template: `
    <div class="invitation" lang="es">
      <div class="grain" aria-hidden="true"></div>
      <header class="invite-header">
        <span class="brand">RENÉ <span>ARIAS</span></span>
        <span class="header-note">UNA INVITACIÓN PERSONAL <span class="star">✦</span> 2026</span>
      </header>

      <div>
        <section class="hero" aria-labelledby="invite-title">
          <div class="hero-photo" aria-hidden="true"></div>
          <div class="hero-shade" aria-hidden="true"></div>
          <div class="hero-content">
            <div class="eyebrow"><span class="line"></span> TIENES UNA INVITACIÓN <span class="line"></span></div>
            <p class="pretitle">Hay noches que merecen celebrarse.</p>
            <h1 id="invite-title">Una noche<br><em>para recordar.</em></h1>
            <p class="hero-copy">Este sábado celebro mi cumpleaños y me encantaría que estés ahí.<br class="desktop-only"> Buena música, brindis y las personas que hacen especial cada año.</p>
            <a class="primary-cta" href="/cumpleanos/2026#detalles">DESCUBRE LOS DETALLES <span aria-hidden="true">↓</span></a>
          </div>
          <div class="hero-bottom"><span>RENÉ ARIAS · CUMPLEAÑOS 2026</span><span>LIMA, PERÚ</span></div>
        </section>

        <section class="details" id="detalles" aria-labelledby="details-title">
          <div class="section-kicker">✦ &nbsp; EL ENCUENTRO &nbsp; ✦</div>
          <h2 id="details-title">Nos vemos <em>allí.</em></h2>
          <div class="details-grid">
            <div class="detail"><span class="detail-label">CUÁNDO</span><strong>Sábado <span class="accent">21</span></strong><p>de noviembre de 2026</p></div>
            <div class="detail"><span class="detail-label">A QUÉ HORA</span><strong>8:00 <span class="accent">p. m.</span></strong><p>La noche apenas comienza</p></div>
            <div class="detail"><span class="detail-label">DÓNDE</span><strong>Sopranos</strong><p>San Miguel · Lima</p></div>
          </div>
          <p class="personal-note">“El mejor regalo es compartir esta noche contigo.”</p>
        </section>

        <section class="location" aria-labelledby="location-title">
          <div class="location-copy">
            <div class="section-kicker">EL LUGAR</div>
            <h2 id="location-title">El punto<br>de <em>encuentro.</em></h2>
            <p class="venue">SOPRANOS SAN MIGUEL</p>
            <address>Av. de la Marina 1685<br>San Miguel, Lima, Perú</address>
            <a class="map-link" [href]="mapsUrl" target="_blank" rel="noopener noreferrer">CÓMO LLEGAR <span aria-hidden="true">↗</span></a>
          </div>
          <div class="map-wrap">
            <iframe title="Mapa de Sopranos San Miguel, Av. de la Marina 1685" src="https://maps.google.com/maps?q=Sopranos%20Av.%20de%20la%20Marina%201685%20San%20Miguel%20Lima&t=&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
          </div>
        </section>

        <section class="closing">
          <span class="closing-symbol" aria-hidden="true">✦</span>
          <p>UNA NOCHE. BUENA COMPAÑÍA. MUCHAS HISTORIAS.</p>
          <h2>Te espero.</h2>
          <button type="button" (click)="share()" class="share-button">{{ copied() ? 'INVITACIÓN COPIADA ✓' : 'COMPARTIR INVITACIÓN ↗' }}</button>
          <span class="signature">René</span>
        </section>
      </div>
      <footer class="invite-footer"><span>RENÉ ARIAS © 2026</span><span>HECHO PARA CELEBRAR JUNTOS</span></footer>
    </div>
  `,
})
export class BirthdayComponent {
  readonly mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Sopranos%20Av.%20de%20la%20Marina%201685%20San%20Miguel%20Lima';
  readonly copied = signal(false);

  async share(): Promise<void> {
    const title = 'Cumpleaños de René Arias';
    const message = [
      '¡Te invito a celebrar mi cumpleaños!',
      '',
      '📅 Sábado 21 de noviembre de 2026',
      '🕗 8:00 p. m. (hora de Lima)',
      '📍 Sopranos San Miguel',
      'Av. de la Marina 1685, San Miguel, Lima, Perú',
      '',
      `Google Maps: ${this.mapsUrl}`,
      'Invitación: https://renearias.com/cumpleanos/2026',
      '',
      '¡Te espero! — René',
    ].join('\n');

    if (navigator.share) {
      try {
        await navigator.share({ title, text: message });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(message);
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 3000);
      } catch { /* Clipboard permissions depend on the browser. */ }
    }
  }
}
