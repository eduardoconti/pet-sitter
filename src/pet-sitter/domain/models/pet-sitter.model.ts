import { BaseModel } from '@core/base-model';

import { UsuarioModel } from '@usuario/models';

import { ServicoModel } from '@servico/domain/models';

import { AvaliacaoModel } from './avaliacao.model';
import { LocalAtendimentoModel } from './local-atendimento.model';

export class PetSitterModel extends BaseModel<number> {
  idUsuario!: string;
  bio?: string;
  usuario!: UsuarioModel;
  localAtendimento?: LocalAtendimentoModel[];
  servicos?: ServicoModel[];
  avaliacoes?: AvaliacaoModel[];
}
