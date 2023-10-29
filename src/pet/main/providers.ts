import { Provider } from '@nestjs/common';
import { CadastrarPetUseCase } from '@pet/app/use-cases';

export const CadastrarPetUseCaseProvider: Provider = {
  provide: CadastrarPetUseCase,
  useFactory() {
    return new CadastrarPetUseCase();
  },
};
