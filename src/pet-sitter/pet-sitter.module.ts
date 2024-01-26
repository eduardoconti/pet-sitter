import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
import { EncontrarPetSitterController } from './presentation/encontrar-pet-sitter';
import { AdicionarLocalAtendimentoController } from './presentation/local-atendimento';
import { PreCadastroPetSitterController } from './presentation/pre-cadastro';
import { AdicionarServicoController } from './presentation/servico';
import {
  EncontrarPetSitterService,
  ExibirPerfilPetSitterService,
} from './app/queries';
import { ExibirPerfilPetSitter } from './presentation/perfil';
import { UsuarioModule } from '@usuario/usuario.module';

@Module({
  controllers: [
    PreCadastroPetSitterController,
    AdicionarLocalAtendimentoController,
    EncontrarPetSitterController,
    AdicionarServicoController,
    ExibirPerfilPetSitter,
  ],
  imports: [
    TypeOrmModule.forFeature([PetSitterSchema]),
    TypeOrmModule.forFeature([LocalAtendimentoSchema]),
    TypeOrmModule.forFeature([ServicoSchema]),
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
  ],
})
export class PetSitterModule {}
