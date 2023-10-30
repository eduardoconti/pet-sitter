import { Module } from '@nestjs/common';
import { CadastrarPetController } from './presentation';
import { CadastrarPetUseCaseProvider } from './main/providers';
import { PetRepository } from './infra/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetSchema } from './infra/schemas';

@Module({
  controllers: [CadastrarPetController],
  imports: [TypeOrmModule.forFeature([PetSchema])],
  providers: [CadastrarPetUseCaseProvider, PetRepository],
})
export class PetModule {}
