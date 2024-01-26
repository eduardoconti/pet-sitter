import { Global, Module } from '@nestjs/common';
import { MailerService } from '@infra/mailer';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@main/config';
import { ApmService } from '@infra/apm/apm.service';

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
