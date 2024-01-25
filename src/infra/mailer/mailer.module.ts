import { Module } from '@nestjs/common';
import { MailerService } from '@infra/mailer';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@main/config';
import { ApmService } from '@infra/apm/apm.service';
import { ApmModule } from '@infra/apm/apm.module';

@Module({
  imports: [ApmModule],
  providers: [
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

        return new MailerService(transporter, apmService);
      },
      inject: [ApmService, ConfigService],
    },
  ],
})
export class MailerModule {}
