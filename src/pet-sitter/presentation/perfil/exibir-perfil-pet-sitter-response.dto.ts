import { TipoServicoEnum } from '@servico/domain/enums';

export class ExibirPerfilPetSitterResponse {
  id!: number;
  nome!: string;
  dataNascimento!: Date;
  servicos!: TipoServicoEnum[];
  localAtendimento!: { cidade: string }[];
  membroDesde!: Date;
}
