import { Module } from '@nestjs/common';

import { ApmService } from './apm.service';
import { MailerService } from '@infra/mailer';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@main/config';

@Module({
  providers: [
    ApmService,
    {
      provide: MailerService,
      useFactory(
        apmService: ApmService,
        configService: ConfigService<EnvironmentVariables>,
      ) {
        const transporter = createTransport({
          service: 'gmail',
          auth: {
            user: configService.get('MAILER_USER'),
            pass: configService.get('MAILER_PASS'),
          },
        });
        console.log(transporter);

        return new MailerService(transporter, apmService);
      },
      inject: [ApmService, ConfigService],
    },
  ],
})
export class ApmModule {}
