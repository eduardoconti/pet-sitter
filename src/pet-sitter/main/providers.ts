import { Provider } from '@nestjs/common';
import { CadastrarPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';

export const CadastrarPetSitterUseCaseProvider: Provider = {
  provide: CadastrarPetSitterUseCase,
  useFactory(repository: IPetSitterRepository) {
    return new CadastrarPetSitterUseCase(repository);
  },
  inject: [PetSitterRepository],
};
