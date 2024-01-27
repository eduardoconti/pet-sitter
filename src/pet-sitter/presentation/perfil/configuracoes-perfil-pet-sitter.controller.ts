import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@auth/guard/auth.guard';
import { PetSitter } from '@infra/decorators/user.decorator';
import { TokenPayload } from '@core/contracts';
import { ExibirPerfilPetSitterService } from '@pet-sitter/app/queries';

import { ConfiguracoesPerfilPetSitterResponse } from './';
@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class ConfiguracaoPerfilPetSitterController {
  constructor(
    @Inject(ExibirPerfilPetSitterService)
    private readonly exibirPerfilService: ExibirPerfilPetSitterService,
  ) {}

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
