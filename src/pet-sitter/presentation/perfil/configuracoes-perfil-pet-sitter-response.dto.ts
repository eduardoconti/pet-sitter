import { IConfiguracoesPerfilPetSitterResponse } from '@pet-sitter/app/queries';

import { TipoServicoEnum } from '@servico/domain/enums';

export class ConfiguracoesPerfilPetSitterResponse
  implements IConfiguracoesPerfilPetSitterResponse
{
  id!: number;
  idUsuario!: string;
  nome!: string;
  sobreNome!: string;
  dataNascimento!: Date;
  email!: string;
  bio?: string;
  servicos?: { id: number; tipoServico: TipoServicoEnum }[];
  localAtendimento?: {
    id: number;
    idCidade: number;
    idEstado: number;
    nomeCidade: string;
    nomeEstado: string;
  }[];
}
