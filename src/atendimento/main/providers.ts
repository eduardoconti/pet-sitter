import { Provider } from '@nestjs/common';

import { NovoAtendimentoUseCase } from '@atendimento/app/use-cases';
import { IAtendimentoRepository } from '@atendimento/domain/repositories';
import { AtendimentoRepository } from '@atendimento/infra/repositories';

export const NovoAtendimentoUseCaseProvider: Provider = {
  provide: NovoAtendimentoUseCase,
  useFactory(repository: IAtendimentoRepository) {
    return new NovoAtendimentoUseCase(repository);
  },
  inject: [AtendimentoRepository],
};
