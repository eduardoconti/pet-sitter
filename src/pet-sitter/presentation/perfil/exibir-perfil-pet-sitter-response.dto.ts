import { IExibirPerfilPetSitterResponse } from '@pet-sitter/app/queries';

import { TipoServicoEnum } from '@servico/domain/enums';

export class ExibirPerfilPetSitterResponse
  implements IExibirPerfilPetSitterResponse
{
  id!: number;
  nome!: string;
  dataNascimento!: Date;
  servicos!: TipoServicoEnum[];
  localAtendimento!: { cidade: string }[];
  membroDesde!: Date;
  avaliacoes!: { quantidadeAvaliacoes: number; rating: number };
}
