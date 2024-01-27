import { Controller, Get, Query } from '@nestjs/common';
import { IFindPaginado } from '@presentation/paginacao';
import { AvaliacoesPetSitterResponse } from '.';
import { AvaliacoesPetSitterFiltro } from './avaliacoes-pet-sitter.filtro';
import { AvaliacoesPetSitterService } from '@pet-sitter/app/queries';
import { ApiTags } from '@nestjs/swagger';

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
