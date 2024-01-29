import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordModule } from '@infra/bcrypt/password.module';

import { UsuarioModule } from '@usuario/usuario.module';

import { ServicoSchema } from '@servico/infra/schemas';

import { LocalizacaoModule } from '@localizacao/localizacao.module';

import {
  EncontrarPetSitterService,
  ExibirPerfilPetSitterService,
  AvaliacoesPetSitterService,
} from './app/queries';
import { PetSitterRepository, ServicoRepository } from './infra/repositories';
import { LocalAtendimentoRepository } from './infra/repositories';
import {
  LocalAtendimentoSchema,
  PetSitterSchema,
  AvaliacaoSchema,
} from './infra/schemas';
import {
  AdicionarLocalAtendimentoUseCaseProvider,
  AdicionarServicoUseCaseProvider,
  CadastrarPetSitterUseCaseProvider,
} from './main/providers';
import { AvaliacoesPetSitterController } from './presentation/avaliacoes-pet-sitter';
import { EncontrarPetSitterController } from './presentation/encontrar-pet-sitter';
import { AdicionarLocalAtendimentoController } from './presentation/local-atendimento';
import { ExibirPerfilPetSitter } from './presentation/perfil';
import { ConfiguracaoPerfilPetSitterController } from './presentation/perfil/configuracoes-perfil-pet-sitter.controller';
import { PreCadastroPetSitterController } from './presentation/pre-cadastro';
import { AdicionarServicoController } from './presentation/servico';

@Module({
  controllers: [
    PreCadastroPetSitterController,
    AdicionarLocalAtendimentoController,
    EncontrarPetSitterController,
    AdicionarServicoController,
    ExibirPerfilPetSitter,
    AvaliacoesPetSitterController,
    ConfiguracaoPerfilPetSitterController,
  ],
  imports: [
    TypeOrmModule.forFeature([PetSitterSchema]),
    TypeOrmModule.forFeature([LocalAtendimentoSchema]),
    TypeOrmModule.forFeature([ServicoSchema]),
    TypeOrmModule.forFeature([AvaliacaoSchema]),
    PasswordModule,
    AuthModule,
    LocalizacaoModule,
    UsuarioModule,
  ],
  providers: [
    CadastrarPetSitterUseCaseProvider,
    PetSitterRepository,
    AdicionarLocalAtendimentoUseCaseProvider,
    LocalAtendimentoRepository,
    ServicoRepository,
    AdicionarServicoUseCaseProvider,
    EncontrarPetSitterService,
    ExibirPerfilPetSitterService,
    AvaliacoesPetSitterService,
  ],
})
export class PetSitterModule {}
