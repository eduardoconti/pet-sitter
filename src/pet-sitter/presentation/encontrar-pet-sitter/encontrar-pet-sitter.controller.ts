import { Controller, Get, Query } from '@nestjs/common';
import { IFindPaginado } from '@presentation/paginacao';
import { EncontrarPetSitterResponseDto } from './';
import { EncontrarPetSitterService } from '@pet-sitter/app/queries';
import { EncontrarPetSitterFiltro } from './encontrar-pet-sitter.filtro';

@Controller('pet-sitter')
export class EncontrarPetSitterController {
  constructor(private readonly queryService: EncontrarPetSitterService) {}

  @Get('encontrar')
  async handle(
    @Query()
    { idEstado, numeroPagina, idCidade, servicos }: EncontrarPetSitterFiltro,
  ): Promise<IFindPaginado<EncontrarPetSitterResponseDto>> {
    return await this.queryService.find(
      idEstado,
      numeroPagina,
      idCidade,
      servicos,
    );
  }
}
