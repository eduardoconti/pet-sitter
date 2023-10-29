import { Module } from '@nestjs/common';
import { CadastrarPetController } from './presentation/cadastrar-pet.controller';
import { CadastrarPetUseCaseProvider } from './main/providers';

@Module({
  controllers: [CadastrarPetController],
  providers: [CadastrarPetUseCaseProvider],
})
export class PetModule {}
