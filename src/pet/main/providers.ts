import { Provider } from '@nestjs/common';
import { CadastrarPetUseCase } from '@pet/app/cadastrar-pet.use-case';

export const CadastrarPetUseCaseProvider: Provider = {
  provide: CadastrarPetUseCase,
  useFactory() {
    return new CadastrarPetUseCase();
  },
};
