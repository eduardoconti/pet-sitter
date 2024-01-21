import { TipoServicoEnum } from '@servico/domain/enums';

export class EncontrarPetSitterResponseDto {
  id!: number;
  nome!: string;
  membroDesde!: Date;
  servicos?: TipoServicoEnum[];
}
