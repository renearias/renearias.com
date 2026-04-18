import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  create(dto: CreateContactDto) {
    console.log('Contact form submission:', dto);
    return { success: true, message: "Message received. I'll be in touch soon." };
  }
}
