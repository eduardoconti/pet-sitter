import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstadoSchema } from './infra/schemas';
import { CidadeSchema } from './infra/schemas/cidade.schema';
import { CidadeController } from './presentation/cidade/cidade.controller';
import { EstadoController } from './presentation/estado';

@Module({
  controllers: [CidadeController, EstadoController],
  imports: [TypeOrmModule.forFeature([CidadeSchema, EstadoSchema])],
})
export class LocalizacaoModule {}
