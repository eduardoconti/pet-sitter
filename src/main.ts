import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { MainModule } from '@main/main.module';

import { AllExceptionsFilter } from './infra/filters';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
