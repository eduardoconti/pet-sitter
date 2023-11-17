import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from '@pet/pet.module';
import { configValidationSchema } from './config';
import { TypeOrmConfigModule } from '@infra/database/typeorm.module';
import { PessoaModule } from '@pessoa/pessoa.module';

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
  ],
})
export class MainModule {}
