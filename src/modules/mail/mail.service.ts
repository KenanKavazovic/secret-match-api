import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMatchEmail(to: string, opponentName: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Your Secret Match!',
      text: `You have been matched with: ${opponentName}!`,
      html: `<p>You have been matched with: ${opponentName}!</p>`,
    });
  }
}
