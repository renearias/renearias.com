import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

export interface UserVisitData {
  isFirstVisit: boolean;
  visitCount: number;
  firstVisitDate: string;
  lastVisitDate: string;
  currentSessionStart: string;
}

@Injectable({ providedIn: 'root' })
export class UserVisitService {
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly visitCookieName = 'ptm_user_visit_data';
  private readonly cookieExpiryDays = 365; // 1 año

  /**
   * Inicializa el tracking de visitas del usuario
   */
  initializeVisitTracking(): UserVisitData {
    if (!isPlatformBrowser(this.platformId)) {
      return this.getDefaultVisitData();
    }

    const existingData = this.getVisitDataFromCookie();
    const now = new Date().toISOString();

    if (!existingData) {
      // Primera visita
      const visitData: UserVisitData = {
        isFirstVisit: true,
        visitCount: 1,
        firstVisitDate: now,
        lastVisitDate: now,
        currentSessionStart: now
      };
      this.saveVisitDataToCookie(visitData);
      return visitData;
    } else {
      // Visita recurrente
      const visitData: UserVisitData = {
        isFirstVisit: false,
        visitCount: existingData.visitCount + 1,
        firstVisitDate: existingData.firstVisitDate,
        lastVisitDate: now,
        currentSessionStart: now
      };
      this.saveVisitDataToCookie(visitData);
      return visitData;
    }
  }

  /**
   * Obtiene los datos de visita actuales
   */
  getCurrentVisitData(): UserVisitData {
    if (!isPlatformBrowser(this.platformId)) {
      return this.getDefaultVisitData();
    }
    return this.getVisitDataFromCookie() || this.getDefaultVisitData();
  }

  /**
   * Verifica si es la primera visita del usuario
   */
  isFirstTimeVisitor(): boolean {
    return this.getCurrentVisitData().isFirstVisit;
  }

  /**
   * Obtiene el número de visitas del usuario
   */
  getVisitCount(): number {
    return this.getCurrentVisitData().visitCount;
  }

  /**
   * Resetea los datos de visita (útil para testing)
   */
  resetVisitData(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.deleteCookie(this.visitCookieName);
  }

  private getVisitDataFromCookie(): UserVisitData | null {
    try {
      const cookieValue = this.getCookie(this.visitCookieName);
      if (cookieValue) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    } catch {
      // Ignore cookie parsing errors
    }
    return null;
  }

  private saveVisitDataToCookie(data: UserVisitData): void {
    try {
      const encodedData = encodeURIComponent(JSON.stringify(data));
      this.setCookie(this.visitCookieName, encodedData, this.cookieExpiryDays);
    } catch {
      // Ignore cookie saving errors
    }
  }

  private getDefaultVisitData(): UserVisitData {
    const now = new Date().toISOString();
    return {
      isFirstVisit: true,
      visitCount: 1,
      firstVisitDate: now,
      lastVisitDate: now,
      currentSessionStart: now
    };
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = this.document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    this.document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  private deleteCookie(name: string): void {
    this.document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }
}
