import { Provider } from '@nestjs/common';

import { PreCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';

import { PasswordService } from '@infra/bcrypt';

import { IHash } from '@core/contracts';

export const CadastrarPetSitterUseCaseProvider: Provider = {
  provide: PreCadastroPetSitterUseCase,
  useFactory(repository: IPetSitterRepository, hash: IHash) {
    return new PreCadastroPetSitterUseCase(repository, hash);
  },
  inject: [PetSitterRepository, PasswordService],
};
