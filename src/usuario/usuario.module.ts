import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioRepository } from './infra/repositories';
import { UsuarioSchema } from './infra/schemas';
import { AtivarCadastroUseCase } from './app/use-cases';
import { AtivarCadastroController } from './presentation/ativar-cadastro';
import { IUsuarioRepository } from './domain/repositories';
import { AtivarCadastroMailerService } from '@usuario/infra/services';

export const ProvideAtivarCadastroUseCase = {
  provide: AtivarCadastroUseCase,
  useFactory(usuarioRepository: IUsuarioRepository) {
    return new AtivarCadastroUseCase(usuarioRepository);
  },
  inject: [UsuarioRepository],
};
@Module({
  controllers: [AtivarCadastroController],
  imports: [TypeOrmModule.forFeature([UsuarioSchema])],
  providers: [
    UsuarioRepository,
    AtivarCadastroMailerService,
    ProvideAtivarCadastroUseCase,
  ],
  exports: [UsuarioRepository, AtivarCadastroMailerService],
})
export class UsuarioModule {}
