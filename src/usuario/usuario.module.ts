import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioRepository } from './infra/repositories';
import { UsuarioSchema } from './infra/schemas/usuario.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioSchema])],
  providers: [UsuarioRepository],
  exports: [UsuarioRepository],
})
export class UsuarioModule {}
