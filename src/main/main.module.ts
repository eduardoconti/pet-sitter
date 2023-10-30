import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from '@pet/pet.module';
import { configValidationSchema } from './config';
import { TypeOrmConfigModule } from '@infra/database/typeorm.module';

@Module({
  imports: [
    PetModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmConfigModule,
  ],
})
export class MainModule {}
