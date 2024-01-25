import { TipoServicoEnum } from '@servico/domain/enums';

export class EncontrarPetSitterResponse {
  id!: number;
  nome!: string;
  membroDesde!: Date;
  servicos?: TipoServicoEnum[];
}
