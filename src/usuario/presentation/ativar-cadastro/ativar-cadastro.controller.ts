import { Controller, Inject, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AtivarCadastroUseCase } from '@usuario/app/use-cases';
import { IAtivarCadastroUseCase } from '@usuario/domain/use-cases';

import { AtivarCadastroParams } from './ativar-cadastro.params';
@ApiTags('usuario')
@Controller('usuario')
export class AtivarCadastroController {
  constructor(
    @Inject(AtivarCadastroUseCase)
    private readonly ativarCadastroUseCase: IAtivarCadastroUseCase,
  ) {}

  @Patch('ativar')
  async handle(@Query() { id }: AtivarCadastroParams): Promise<string> {
    return await this.ativarCadastroUseCase.executar(id);
  }
}
