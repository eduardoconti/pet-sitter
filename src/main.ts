import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApmService } from '@infra/apm/apm.service';

import { MainModule } from '@main/main.module';

import { AllExceptionsFilter } from './infra/filters';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const apmService = app.get(ApmService);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, apmService));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Pet Sitters')
    .setDescription('API Pet Sitters')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('usuario')
    .addTag('pet-sitter')
    .addTag('servico')
    .addTag('localizacao')
    .addTag('local-atendimento')
    //.addTag('atendimento')
    .addTag('pet')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
