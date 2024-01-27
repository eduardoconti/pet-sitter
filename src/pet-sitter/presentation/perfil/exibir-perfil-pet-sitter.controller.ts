import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ExibirPerfilPetSitterResponse } from './exibir-perfil-pet-sitter-response.dto';
import { ExibirPerfilPetSitterService } from '@pet-sitter/app/queries';
import { ExibirPerfilParams } from './exibir-perfil.params';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class ExibirPerfilPetSitter {
  constructor(
    @Inject(ExibirPerfilPetSitterService)
    private readonly exibirPerfilService: ExibirPerfilPetSitterService,
  ) {}

  @Get('exibir-perfil')
  async handle(
    @Query() { id }: ExibirPerfilParams,
  ): Promise<ExibirPerfilPetSitterResponse> {
    return await this.exibirPerfilService.find(id);
  }
}
