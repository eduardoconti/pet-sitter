import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AtendimentoRepository } from './infra/repositories';
import { AtendimentoSchema } from './infra/schemas';
import { NovoAtendimentoUseCaseProvider } from './main/providers';
import { NovoAtendimentoController } from './presentation';

@Module({
  controllers: [NovoAtendimentoController],
  imports: [TypeOrmModule.forFeature([AtendimentoSchema])],
  providers: [NovoAtendimentoUseCaseProvider, AtendimentoRepository],
})
export class AtendimentoModule {}
