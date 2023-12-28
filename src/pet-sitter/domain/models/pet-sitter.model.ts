import { PessoaModel } from '@pessoa/models';

import { LocalAtendimentoModel } from './local-atendimento.model';

export class PetSitterModel extends PessoaModel {
  localAtendimento?: LocalAtendimentoModel;
}
