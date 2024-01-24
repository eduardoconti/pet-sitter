import {
  IEmailService,
  ITransporter,
  SendEmailProps,
} from '@core/mailer.interface';
import { ApmService } from '@infra/apm/apm.service';

export class MailerService implements IEmailService {
  constructor(
    private readonly transporter: ITransporter,
    private readonly logger: ApmService,
  ) {}

  async send(data: SendEmailProps): Promise<void> {
    const { from, to, subject, body } = data;

    await Promise.resolve(
      this.transporter.sendMail({
        from,
        to,
        subject,
        html: body,
      }),
    ).catch((error) => this.logger.captureException(error));
  }
}
