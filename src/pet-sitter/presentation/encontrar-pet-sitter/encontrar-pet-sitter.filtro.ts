import { IFiltroPaginado } from '@presentation/paginacao';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { TipoServicoEnum } from '@servico/domain/enums';

export class EncontrarPetSitterFiltro implements IFiltroPaginado {
  @Transform(({ value }) => Number(value))
  @Min(1, { message: 'Numero da pagina deve ser maior ou igual a 1' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Numero da pagina deve ser numerico inteiro' },
  )
  numeroPagina!: number;

  @Transform(({ value }) =>
    value
      ? value
          .replace(/\s/g, '')
          .split(',')
          .map((e: string) => Number(e))
      : null,
  )
  @IsArray()
  @IsNumber({}, { each: true, message: 'Ids de cidade devem ser numericos' })
  @IsOptional()
  idCidade?: number[];

  @Transform(({ value }) =>
    value ? value.replace(/\s/g, '').split(',') : null,
  )
  @IsArray()
  @IsEnum(TipoServicoEnum, {
    each: true,
    message: `Servico aceita os valores ${Object.values(TipoServicoEnum)}`,
  })
  @IsOptional()
  servicos?: TipoServicoEnum[];

  @Transform(({ value }) => Number(value))
  @IsNumber()
  idEstado!: number;
}
