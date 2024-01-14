import { Provider } from '@nestjs/common';

import { PreCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';

export const CadastrarPetSitterUseCaseProvider: Provider = {
  provide: PreCadastroPetSitterUseCase,
  useFactory(repository: IPetSitterRepository) {
    return new PreCadastroPetSitterUseCase(repository);
  },
  inject: [PetSitterRepository],
};
