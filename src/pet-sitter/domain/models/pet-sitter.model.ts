import { BaseModel } from '@core/base-model';

import { UsuarioModel } from '@usuario/models';

import { ServicoModel } from '@servico/domain/models';

import { LocalAtendimentoModel } from './local-atendimento.model';

export class PetSitterModel extends BaseModel<number> {
  idUsuario!: string;
  usuario!: UsuarioModel;
  localAtendimento?: LocalAtendimentoModel[];
  servicos?: ServicoModel[];
}
