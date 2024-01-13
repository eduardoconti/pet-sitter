import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PetSitterModule } from '@pet-sitter/pet-sitter.module';
import { PetModule } from '@pet/pet.module';

import { ApmModule } from '@infra/apm/apm.module';
import { TypeOrmConfigModule } from '@infra/database/typeorm.module';
import { IdempotencyModule } from '@infra/idempotency/idempotency.module';

import { UsuarioModule } from '@usuario/usuario.module';

import { AtendimentoModule } from '@atendimento/atendimento.module';

import { TutorModule } from '@tutor/tutor.module';

import { configValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmConfigModule,
    PetModule,
    UsuarioModule,
    AtendimentoModule,
    PetSitterModule,
    TutorModule,
    ApmModule,
    IdempotencyModule,
  ],
})
export class MainModule {}
