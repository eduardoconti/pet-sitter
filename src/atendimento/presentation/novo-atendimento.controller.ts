import { Controller, Inject, Post } from '@nestjs/common';

import { NovoAtendimentoUseCase } from '@atendimento/app/use-cases';
import { INovoAtendimentoUseCase } from '@atendimento/domain/use-cases';

@Controller('atendimento')
export class NovoAtendimentoController {
  constructor(
    @Inject(NovoAtendimentoUseCase)
    private readonly cadastrarPetUseCase: INovoAtendimentoUseCase,
  ) {}

  @Post('novo')
  async novoAtendimento() {
    return await this.cadastrarPetUseCase.executar();
  }
}
