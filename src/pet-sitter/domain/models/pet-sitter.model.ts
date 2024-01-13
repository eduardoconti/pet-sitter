import { UsuarioModel } from 'src/usuario/models';

import { LocalAtendimentoModel } from './local-atendimento.model';

export class PetSitterModel extends UsuarioModel {
  localAtendimento?: LocalAtendimentoModel;
}
