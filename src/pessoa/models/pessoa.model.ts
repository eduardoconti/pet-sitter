import { BaseModel } from '@core/base-model';

import { ContatoModel } from './contato.model';

export abstract class PessoaModel extends BaseModel {
  nome!: string;
  dataNascimento!: Date | string | number;
  contato!: ContatoModel;
}
