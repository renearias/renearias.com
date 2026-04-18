import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST'),
      port: this.config.get<number>('SMTP_PORT', 587),
      secure: this.config.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    });

    this.transporter.verify().then(() => {
      this.logger.log('SMTP connection verified successfully');
    }).catch((err) => {
      this.logger.error('SMTP connection failed — emails will NOT be delivered', err);
    });
  }

  async create(dto: CreateContactDto) {
    const to = this.config.get<string>('CONTACT_EMAIL', 'hello@renearias.com');
    const from = this.config.get<string>('SMTP_FROM', `"René Arias Website" <${this.config.get('SMTP_USER')}>`);

    try {
      await this.transporter.sendMail({
        from,
        to,
        replyTo: dto.email,
        subject: `[renearias.com] ${dto.subject ? `${dto.subject} — ` : ''}Message from ${dto.name}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${dto.name}</p>
          <p><strong>Email:</strong> ${dto.email}</p>
          ${dto.subject ? `<p><strong>Subject:</strong> ${dto.subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-line">${dto.message}</p>
        `,
        text: [
          `Name: ${dto.name}`,
          `Email: ${dto.email}`,
          dto.subject ? `Subject: ${dto.subject}` : '',
          `\nMessage:\n${dto.message}`,
        ].filter(Boolean).join('\n'),
      });

      this.logger.log(`Contact email sent from ${dto.email}`);
      return { success: true, message: "Message received. I'll be in touch soon." };
    } catch (err) {
      this.logger.error('Failed to send contact email', err);
      throw new InternalServerErrorException('Failed to send message. Please try again later.');
    }
  }
}
