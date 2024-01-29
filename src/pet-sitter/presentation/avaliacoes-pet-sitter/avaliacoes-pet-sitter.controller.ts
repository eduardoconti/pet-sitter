import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IFindPaginado } from '@presentation/paginacao';

import { AvaliacoesPetSitterService } from '@pet-sitter/app/queries';

import { AvaliacoesPetSitterResponse } from '.';
import { AvaliacoesPetSitterFiltro } from './avaliacoes-pet-sitter.filtro';

@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class AvaliacoesPetSitterController {
  constructor(private readonly queryService: AvaliacoesPetSitterService) {}

  @Get('avaliacoes')
  async handle(
    @Query()
    { numeroPagina, id: idPetSitter }: AvaliacoesPetSitterFiltro,
  ): Promise<IFindPaginado<AvaliacoesPetSitterResponse>> {
    return await this.queryService.find({ numeroPagina, idPetSitter });
  }
}
