import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetRepository } from './infra/repositories';
import { PetSchema } from './infra/schemas';
import { CadastrarPetUseCaseProvider } from './main/providers';
import { CadastrarPetController } from './presentation';

@Module({
  controllers: [CadastrarPetController],
  imports: [TypeOrmModule.forFeature([PetSchema])],
  providers: [CadastrarPetUseCaseProvider, PetRepository],
})
export class PetModule {}
