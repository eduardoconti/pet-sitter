import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { ApmService } from '@infra/apm/apm.service';

import { MainModule } from '@main/main.module';

import { AllExceptionsFilter } from './infra/filters';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const apmService = app.get(ApmService);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, apmService));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
