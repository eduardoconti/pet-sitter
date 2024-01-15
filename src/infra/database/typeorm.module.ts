import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import type { EnvironmentVariables } from '@main/config';

export const getTypeOrmModuleOptions = (
  config: ConfigService<EnvironmentVariables>,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getOrThrow('DATABASE_HOST'),
    port: config.getOrThrow('DATABASE_PORT'),
    username: config.getOrThrow('DATABASE_USER'),
    password: config.getOrThrow('DATABASE_PASSWORD'),
    database: config.getOrThrow('DATABASE_NAME'),
    entities: [__dirname + './../../**/*.schema{.ts,.js}'],
    synchronize: true,
    logging: config.getOrThrow('DATABASE_LOGGING'),
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
