import { AtendimentoModule } from '@atendimento/atendimento.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PessoaModule } from '@pessoa/pessoa.module';
import { PetSitterModule } from '@pet-sitter/pet-sitter.module';
import { PetModule } from '@pet/pet.module';
import { TutorModule } from '@tutor/tutor.module';

import { TypeOrmConfigModule } from '@infra/database/typeorm.module';

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
    PessoaModule,
    AtendimentoModule,
    PetSitterModule,
    TutorModule,
  ],
})
export class MainModule {}
