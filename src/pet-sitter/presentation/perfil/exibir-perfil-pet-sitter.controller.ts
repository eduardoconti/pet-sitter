import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ExibirPerfilPetSitterResponse } from './exibir-perfil-pet-sitter-response.dto';
import { ExibirPerfilPetSitterService } from '@pet-sitter/app/queries';

@Controller('pet-sitter')
export class ExibirPerfilPetSitter {
  constructor(
    @Inject(ExibirPerfilPetSitterService)
    private readonly exibirPerfilService: ExibirPerfilPetSitterService,
  ) {}

  @Get('exibir-perfil')
  async handle(
    @Query('id') idPetSitter: number,
  ): Promise<ExibirPerfilPetSitterResponse> {
    return await this.exibirPerfilService.find(idPetSitter);
  }
}
