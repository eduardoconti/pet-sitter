import { BaseModel } from '@core/base-model';
import { ContatoModel } from './contato.model';

export type PessoaModel = BaseModel & {
  nome: string;
  dataNascimento: Date | string | number;
  contato: ContatoModel;
};
