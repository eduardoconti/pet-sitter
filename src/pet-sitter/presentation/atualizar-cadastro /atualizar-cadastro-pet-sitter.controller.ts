import { AuthGuard } from '@auth/guard/auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AtualizarCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IAtualizarCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';

import { PetSitter } from '@infra/decorators/user.decorator';

import { TokenPayload } from '@core/contracts';

import { AtualizarCadastroPetSitterDto } from './atualizar-cadastro-pet-sitter.dto';
@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class AtualizarCadastroPetSitterController {
  constructor(
    @Inject(AtualizarCadastroPetSitterUseCase)
    private readonly atualizarCadastroPetSitterUseCase: IAtualizarCadastroPetSitterUseCase,
  ) {}

  @ApiBearerAuth()
  @Patch('atualizar-cadastro')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async handle(
    @Body() dto: AtualizarCadastroPetSitterDto,
    @PetSitter() { id, idPerfil }: TokenPayload,
  ): Promise<void> {
    await this.atualizarCadastroPetSitterUseCase.executar({
      id,
      idPetSitter: idPerfil,
      ...dto,
    });
  }
}
