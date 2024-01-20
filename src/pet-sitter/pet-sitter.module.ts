import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { PasswordModule } from '@infra/bcrypt/password.module';

import { ServicoSchema } from '@servico/infra/schemas';

import { LocalizacaoModule } from '@localizacao/localizacao.module';

import { PetSitterRepository, ServicoRepository } from './infra/repositories';
import { LocalAtendimentoRepository } from './infra/repositories';
import { LocalAtendimentoSchema, PetSitterSchema } from './infra/schemas';
import {
  AdicionarLocalAtendimentoUseCaseProvider,
  AdicionarServicoUseCaseProvider,
  CadastrarPetSitterUseCaseProvider,
} from './main/providers';
import { EncontrarPetSitterController } from './presentation/encontrar-pet-sitter/encontrar-pet-sitter.controller';
import { AdicionarLocalAtendimentoController } from './presentation/local-atendimento';
import { PreCadastroPetSitterController } from './presentation/pre-cadastro';
import { AdicionarServicoController } from './presentation/servico';

@Module({
  controllers: [
    PreCadastroPetSitterController,
    AdicionarLocalAtendimentoController,
    EncontrarPetSitterController,
    AdicionarServicoController,
  ],
  imports: [
    TypeOrmModule.forFeature([PetSitterSchema]),
    TypeOrmModule.forFeature([LocalAtendimentoSchema]),
    TypeOrmModule.forFeature([ServicoSchema]),
    PasswordModule,
    AuthModule,
    LocalizacaoModule,
  ],
  providers: [
    CadastrarPetSitterUseCaseProvider,
    PetSitterRepository,
    AdicionarLocalAtendimentoUseCaseProvider,
    LocalAtendimentoRepository,
    ServicoRepository,
    AdicionarServicoUseCaseProvider,
  ],
})
export class PetSitterModule {}
