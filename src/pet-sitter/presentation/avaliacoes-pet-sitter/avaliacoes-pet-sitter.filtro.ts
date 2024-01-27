import { IFiltroPaginado } from '@presentation/paginacao';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class AvaliacoesPetSitterFiltro implements IFiltroPaginado {
  @Transform(({ value }) => Number(value))
  @Min(1, { message: 'Numero da pagina deve ser maior ou igual a 1' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Numero da pagina deve ser numerico inteiro' },
  )
  numeroPagina!: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id!: number;
}
