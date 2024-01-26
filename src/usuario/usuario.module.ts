import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioRepository } from './infra/repositories';
import { UsuarioSchema } from './infra/schemas/usuario.schema';
import { AtivarCadastroUseCase } from './app/use-cases';
import { AtivarCadastroController } from './presentation/ativar-cadastro';

@Module({
  controllers: [AtivarCadastroController],
  imports: [TypeOrmModule.forFeature([UsuarioSchema])],
  providers: [UsuarioRepository, AtivarCadastroUseCase],
  exports: [UsuarioRepository],
})
export class UsuarioModule {}
