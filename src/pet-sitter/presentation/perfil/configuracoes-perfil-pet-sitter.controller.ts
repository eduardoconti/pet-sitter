import { AuthGuard } from '@auth/guard/auth.guard';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ExibirPerfilPetSitterService } from '@pet-sitter/app/queries';

import { PetSitter } from '@infra/decorators/user.decorator';

import { TokenPayload } from '@core/contracts';

import { ConfiguracoesPerfilPetSitterResponse } from './';
@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class ConfiguracaoPerfilPetSitterController {
  constructor(
    @Inject(ExibirPerfilPetSitterService)
    private readonly exibirPerfilService: ExibirPerfilPetSitterService,
  ) {}

  @ApiBearerAuth()
  @Get('perfil')
  @UseGuards(AuthGuard)
  async handle(
    @PetSitter() usuario: TokenPayload,
  ): Promise<ConfiguracoesPerfilPetSitterResponse> {
    return await this.exibirPerfilService.configuracoes({
      idUsuario: usuario.id,
    });
  }
}
