import { IFiltroPaginado } from '@presentation/paginacao';
import { TipoServicoEnum } from '@servico/domain/enums';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class EncontrarPetSitterFiltro implements IFiltroPaginado {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  numeroPagina!: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  tamanhoPagina!: number;

  @Transform(({ value }) => (value ? value.split(',') : null))
  @IsArray()
  @IsOptional()
  idCidade?: number[];

  @Transform(({ value }) => (value ? value.split(',') : null))
  @IsArray()
  @IsOptional()
  servicos?: TipoServicoEnum[];

  @Transform(({ value }) => Number(value))
  @IsNumber()
  idEstado!: number;
}
