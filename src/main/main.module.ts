import { AtendimentoModule } from '@atendimento/atendimento.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PessoaModule } from '@pessoa/pessoa.module';
import { PetModule } from '@pet/pet.module';

import { TypeOrmConfigModule } from '@infra/database/typeorm.module';

import { configValidationSchema } from './config';

@Module({
  imports: [
    PetModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmConfigModule,
    PessoaModule,
    AtendimentoModule,
  ],
})
export class MainModule {}
