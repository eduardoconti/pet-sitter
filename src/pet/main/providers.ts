import { Provider } from '@nestjs/common';
import { CadastrarPetUseCase } from '@pet/app/use-cases';
import { IPetRepository } from '@pet/domain/repositories';
import { PetRepository } from '@pet/infra/repositories';

export const CadastrarPetUseCaseProvider: Provider = {
  provide: CadastrarPetUseCase,
  useFactory(repository: IPetRepository) {
    return new CadastrarPetUseCase(repository);
  },
  inject: [PetRepository],
};
