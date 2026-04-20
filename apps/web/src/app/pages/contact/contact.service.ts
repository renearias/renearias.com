import { Injectable, inject } from '@angular/core';
import { ApiService } from '@arxis/api';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private api = inject(ApiService);

  send(payload: ContactPayload): Observable<void> {
    return this.api.post<void>('api/contact', payload);
  }
}
