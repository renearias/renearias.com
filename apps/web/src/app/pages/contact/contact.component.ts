import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-2xl mx-auto">
        <p class="text-[#888888] text-sm uppercase tracking-[0.3em] mb-6">Contact</p>
        <h1 class="font-display text-6xl font-bold text-[#e8e8e8] mb-4">Say Hello</h1>
        <p class="text-[#888888] text-xl mb-16">For engineering opportunities, music collaborations, or anything in between.</p>

        @if (submitted()) {
          <div class="border border-[#d4af37]/30 bg-[#d4af37]/10 p-8 text-center">
            <div class="text-4xl mb-4">✓</div>
            <h2 class="text-[#e8e8e8] text-xl font-semibold mb-2">Message Sent</h2>
            <p class="text-[#888888]">I'll get back to you within a few days.</p>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="name" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">Name</label>
              <input
                id="name"
                formControlName="name"
                type="text" 
                class="w-full bg-transparent border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors"
                placeholder="Your name">
              @if (form.get('name')?.invalid && form.get('name')?.touched) {
                <p class="text-red-400 text-xs mt-1">Name is required</p>
              }
            </div>

            <div>
              <label for="email" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">Email</label>
              <input
                id="email"
                formControlName="email"
                type="email" 
                class="w-full bg-transparent border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors"
                placeholder="your@email.com">
              @if (form.get('email')?.invalid && form.get('email')?.touched) {
                <p class="text-red-400 text-xs mt-1">Valid email is required</p>
              }
            </div>

            <div>
              <label for="subject" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">Subject</label>
              <select
                id="subject"
                formControlName="subject"
                class="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors">
                <option value="">Select a topic</option>
                <option value="engineering">Engineering Opportunity</option>
                <option value="music">Music Collaboration</option>
                <option value="consulting">Consulting</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-[#888888] text-xs uppercase tracking-wider mb-2">Message</label>
              <textarea
                id="message"
                formControlName="message"
                rows="6"
                class="w-full bg-transparent border border-[#1f1f1f] text-[#e8e8e8] px-4 py-3 focus:border-[#d4af37] outline-none transition-colors resize-none"
                placeholder="Tell me what you're thinking..."></textarea>
              @if (form.get('message')?.invalid && form.get('message')?.touched) {
                <p class="text-red-400 text-xs mt-1">Message is required</p>
              }
            </div>

            <button 
              type="submit"
              [disabled]="form.invalid"
              class="w-full py-4 bg-[#d4af37] text-[#0a0a0a] font-bold tracking-widest uppercase hover:bg-[#c9a227] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Send Message
            </button>
          </form>
        }

        <div class="border-t border-[#1f1f1f] mt-16 pt-12">
          <p class="text-[#888888] text-xs uppercase tracking-wider mb-6">Or reach out directly</p>
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
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.submitted.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
