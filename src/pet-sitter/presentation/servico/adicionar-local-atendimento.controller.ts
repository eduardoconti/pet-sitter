import { AuthGuard } from '@auth/guard/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AdicionarServicoUseCase } from '@pet-sitter/app/use-cases/adicionar-servico.use-case';

import { User } from '@infra/decorators/user.decorator';

import { TokenPayload } from '@core/contracts';

import { AdicionarServicoDto } from './adicionar-servico.dto';

@Controller('servico')
export class AdicionarServicoController {
  constructor(
    private readonly adicionarServicoUseCase: AdicionarServicoUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post('adicionar')
  async adicionar(
    @Body() input: AdicionarServicoDto,
    @User() { id: idUsuario }: TokenPayload,
  ) {
    return await this.adicionarServicoUseCase.executar({
      ...input,
      idUsuario,
    });
  }
}
