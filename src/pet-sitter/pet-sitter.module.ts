import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordModule } from '@infra/bcrypt/password.module';

import { PetSitterRepository } from './infra/repositories';
import { PetSitterSchema } from './infra/schemas';
import { CadastrarPetSitterUseCaseProvider } from './main/providers';
import { PreCadastroPetSitterController } from './presentation/pre-cadastro';

@Module({
  controllers: [PreCadastroPetSitterController],
  imports: [TypeOrmModule.forFeature([PetSitterSchema]), PasswordModule],
  providers: [CadastrarPetSitterUseCaseProvider, PetSitterRepository],
})
export class PetSitterModule {}
