import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-2xl mx-auto">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">{{ 'contact.label' | translate }}</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-4">{{ 'contact.heading' | translate }}</h1>
        <p class="text-[#888888] text-xl mb-16">{{ 'contact.subheading' | translate }}</p>

        @if (submitted()) {
          <div class="border border-[#d4af37]/30 bg-[#d4af37]/10 p-8 text-center">
            <div class="text-4xl mb-4">✓</div>
            <h2 class="text-[#e8e8e8] text-xl font-semibold mb-2">{{ 'contact.sent_heading' | translate }}</h2>
            <p class="text-[#888888]">{{ 'contact.sent_body' | translate }}</p>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="name" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">{{ 'contact.name' | translate }}</label>
              <input
                id="name"
                formControlName="name"
                type="text" 
                class="w-full bg-transparent border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors"
                [placeholder]="'contact.name_placeholder' | translate">
              @if (form.get('name')?.invalid && form.get('name')?.touched) {
                <p class="text-red-400 text-xs mt-1">{{ 'contact.error_name' | translate }}</p>
              }
            </div>

            <div>
              <label for="email" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">{{ 'contact.email' | translate }}</label>
              <input
                id="email"
                formControlName="email"
                type="email" 
                class="w-full bg-transparent border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors"
                [placeholder]="'contact.email_placeholder' | translate">
              @if (form.get('email')?.invalid && form.get('email')?.touched) {
                <p class="text-red-400 text-xs mt-1">{{ 'contact.error_email' | translate }}</p>
              }
            </div>

            <div>
              <label for="subject" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">{{ 'contact.subject' | translate }}</label>
              <select
                id="subject"
                formControlName="subject"
                class="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors">
                <option value="">{{ 'contact.select_topic' | translate }}</option>
                <option value="engineering">{{ 'contact.topic_engineering' | translate }}</option>
                <option value="music">{{ 'contact.topic_music' | translate }}</option>
                <option value="consulting">{{ 'contact.topic_consulting' | translate }}</option>
                <option value="general">{{ 'contact.topic_general' | translate }}</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">{{ 'contact.message' | translate }}</label>
              <textarea
                id="message"
                formControlName="message"
                rows="6"
                class="w-full bg-transparent border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors resize-none"
                [placeholder]="'contact.message_placeholder' | translate"></textarea>
              @if (form.get('message')?.invalid && form.get('message')?.touched) {
                <p class="text-red-400 text-xs mt-1">{{ 'contact.error_message' | translate }}</p>
              }
            </div>

            @if (errorMessage()) {
              <p class="text-red-400 text-sm">{{ errorMessage() }}</p>
            }

            <button 
              type="submit"
              [disabled]="form.invalid || sending()"
              class="w-full py-4 bg-[#d4af37] text-[#0a0a0a] font-bold tracking-widest uppercase hover:bg-[#c9a227] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ sending() ? ('contact.sending' | translate) : ('contact.send' | translate) }}
            </button>
          </form>
        }

        <div class="border-t border-[#1f1f1f] mt-16 pt-12">
          <p class="text-[#888888] text-xs uppercase tracking-wider mb-6">{{ 'contact.or_reach_out' | translate }}</p>
          <div class="space-y-3">
            <a href="mailto:hello@renearias.com" class="block text-[#e8e8e8] hover:text-[#d4af37] transition-colors">hello&#64;renearias.com</a>
            <a href="https://github.com/renearias" target="_blank" class="block text-[#888888] hover:text-[#e8e8e8] transition-colors">github.com/renearias</a>
            <a href="https://linkedin.com/in/renearias" target="_blank" class="block text-[#888888] hover:text-[#e8e8e8] transition-colors">linkedin.com/in/renearias</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  submitted = signal(false);
  sending = signal(false);
  errorMessage = signal<string | null>(null);

  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.errorMessage.set(null);

    this.contactService.send(this.form.value).subscribe({
      next: () => {
        this.submitted.set(true);
        this.sending.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to send message. Please try again or email me directly.');
        this.sending.set(false);
      },
    });
  }
}
