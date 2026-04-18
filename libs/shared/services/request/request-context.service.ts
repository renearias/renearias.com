import { Injectable, inject, InjectionToken, Injector } from '@angular/core';
import { REQUEST } from '@angular/core';

export interface RequestInfo {
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  originalUrl?: string;
  path?: string;
}

// Type for the request object that can vary between different SSR implementations
interface RequestLike {
  url?: string;
  originalUrl?: string;
  path?: string;
  method?: string;
  headers?: Record<string, string | undefined> & {
    get?(name: string): string | null;
  };
}

// Custom token for our request context
export const CUSTOM_REQUEST = new InjectionToken<RequestLike>('CUSTOM_REQUEST');

@Injectable({ providedIn: 'root' })
export class RequestContextService {
  private injector = inject(Injector);

  constructor() {
    // Constructor vacío - la información se genera a demanda
  }

  getRequestInfo(): RequestInfo | null {
    // Inject tokens fresh cada vez que se llama el método
    const customReq = this.injector.get(CUSTOM_REQUEST, null);
    const standardReq = this.injector.get(REQUEST, null) as RequestLike | null;
    
    const req = standardReq || customReq;

    if (req) {
      return {
        url: req.url || req.originalUrl,
        method: req.method,
        headers: this.extractHeaders(req),
        originalUrl: req.originalUrl,
        path: req.path
      };
    }
    
    return null;
  }

  private extractHeaders(req: RequestLike): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (req.headers) {
      // Handle different header formats
      if (typeof req.headers.get === 'function') {
        // Headers with get() method
        const commonHeaders = ['host', 'accept-language', 'user-agent', 'referer', 'x-forwarded-proto', 'cf-ipcountry'];
        for (const header of commonHeaders) {
          const value = req.headers.get(header);
          if (value) {
            headers[header] = value;
          }
        }
      } else {
        // Plain object headers
        for (const [key, value] of Object.entries(req.headers)) {
          if (typeof value === 'string') {
            headers[key] = value;
          }
        }
      }
    }
    
    return headers;
  }
}
