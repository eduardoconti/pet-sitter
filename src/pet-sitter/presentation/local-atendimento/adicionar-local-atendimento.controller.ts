import { AuthGuard } from '@auth/guard/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AdicionarLocalAtendimentoUseCase } from '@pet-sitter/app/use-cases/adicionar-local-atendimento.use-case';

import { User } from '@infra/decorators/user.decorator';

import { TokenPayload } from '@core/contracts';

import { AdicionarLocalAtendimentoDto } from './adicionar-local-atendimento.dto';

@Controller('local-atendimento')
export class AdicionarLocalAtendimentoController {
  constructor(
    private readonly adicionarLocalAtendimentoUseCase: AdicionarLocalAtendimentoUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post('adicionar')
  async adicionar(
    @Body() input: AdicionarLocalAtendimentoDto,
    @User() { id: idUsuario }: TokenPayload,
  ) {
    return await this.adicionarLocalAtendimentoUseCase.executar({
      ...input,
      idUsuario,
    });
  }
}
