import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IFindPaginado } from '@presentation/paginacao';

import { EncontrarPetSitterService } from '@pet-sitter/app/queries';

import { EncontrarPetSitterResponse } from './';
import { EncontrarPetSitterFiltro } from './encontrar-pet-sitter.filtro';
@ApiTags('pet-sitter')
@Controller('pet-sitter')
export class EncontrarPetSitterController {
  constructor(private readonly queryService: EncontrarPetSitterService) {}

  @Get('encontrar')
  async handle(
    @Query()
    { idEstado, numeroPagina, idCidade, servicos }: EncontrarPetSitterFiltro,
  ): Promise<IFindPaginado<EncontrarPetSitterResponse>> {
    return await this.queryService.find(
      idEstado,
      numeroPagina,
      idCidade,
      servicos,
    );
  }
}
