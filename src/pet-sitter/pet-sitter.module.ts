import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetSitterRepository } from './infra/repositories';
import { PetSitterSchema } from './infra/schemas';
import { CadastrarPetSitterUseCaseProvider } from './main/providers';
import { CadastrarPetSitterController } from './presentation';

@Module({
  controllers: [CadastrarPetSitterController],
  imports: [TypeOrmModule.forFeature([PetSitterSchema])],
  providers: [CadastrarPetSitterUseCaseProvider, PetSitterRepository],
})
export class PetSitterModule {}
