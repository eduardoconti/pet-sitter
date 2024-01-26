import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AtivarCadastroUseCase } from '@usuario/app/use-cases';
import { IAtivarCadastroUseCase } from '@usuario/domain/use-cases';
import { AtivarCadastroParams } from './ativar-cadastro.params';

@Controller('usuario')
export class AtivarCadastroController {
  constructor(
    @Inject(AtivarCadastroUseCase)
    private readonly ativarCadastroUseCase: IAtivarCadastroUseCase,
  ) {}

  @Get('ativar')
  async handle(@Query() { id }: AtivarCadastroParams): Promise<string> {
    return await this.ativarCadastroUseCase.executar(id);
  }
}
