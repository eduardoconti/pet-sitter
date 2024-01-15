import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { PasswordModule } from '@infra/bcrypt/password.module';

import { LocalizacaoModule } from '@localizacao/localizacao.module';

import { PetSitterRepository } from './infra/repositories';
import { LocalAtendimentoRepository } from './infra/repositories';
import { LocalAtendimentoSchema, PetSitterSchema } from './infra/schemas';
import {
  AdicionarLocalAtendimentoUseCaseProvider,
  CadastrarPetSitterUseCaseProvider,
} from './main/providers';
import { EncontrarPetSitterController } from './presentation/encontrar-pet-sitter/encontrar-pet-sitter.controller';
import { AdicionarLocalAtendimentoController } from './presentation/local-atendimento';
import { PreCadastroPetSitterController } from './presentation/pre-cadastro';

@Module({
  controllers: [
    PreCadastroPetSitterController,
    AdicionarLocalAtendimentoController,
    EncontrarPetSitterController,
  ],
  imports: [
    TypeOrmModule.forFeature([PetSitterSchema]),
    TypeOrmModule.forFeature([LocalAtendimentoSchema]),
    PasswordModule,
    AuthModule,
    LocalizacaoModule,
  ],
  providers: [
    CadastrarPetSitterUseCaseProvider,
    PetSitterRepository,
    AdicionarLocalAtendimentoUseCaseProvider,
    LocalAtendimentoRepository,
  ],
})
export class PetSitterModule {}
