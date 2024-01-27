import { IEncontrarPetSitterResponse } from '@pet-sitter/app/queries';
import { TipoServicoEnum } from '@servico/domain/enums';

export class EncontrarPetSitterResponse implements IEncontrarPetSitterResponse {
  id!: number;
  nome!: string;
  dataNascimento!: Date;
  membroDesde!: Date;
  servicos!: TipoServicoEnum[];
  localAtendimento!: { cidade: string }[];
}
