import { UsuarioModel } from 'src/usuario/models';

import { BaseModel } from '@core/base-model';

import { LocalAtendimentoModel } from './local-atendimento.model';

export class PetSitterModel extends BaseModel<number> {
  idUsuario!: string;
  usuario!: UsuarioModel;
  localAtendimento?: LocalAtendimentoModel[];
}
