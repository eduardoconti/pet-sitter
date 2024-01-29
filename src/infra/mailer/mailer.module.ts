import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

import { ApmService } from '@infra/apm/apm.service';
import { MailerService } from '@infra/mailer';

import { EnvironmentVariables } from '@main/config';

const provider = {
  provide: MailerService,
  useFactory(
    apmService: ApmService,
    configService: ConfigService<EnvironmentVariables>,
  ) {
    const transporter = createTransport({
      host: configService.getOrThrow<string>('MAILER_HOST'),
      port: configService.getOrThrow<number>('MAILER_PORT'),
      auth: {
        user: configService.getOrThrow<string>('MAILER_USER'),
        pass: configService.getOrThrow<string>('MAILER_PASS'),
      },
    });

    return new MailerService(transporter, apmService);
  },
  inject: [ApmService, ConfigService],
};

@Global()
@Module({
  providers: [provider],
  exports: [provider],
})
export class MailerModule {}
