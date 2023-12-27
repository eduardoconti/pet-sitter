import { Entity } from '@core/entity';
import { ContatoModel, PessoaModel } from 'src/pessoa/models';

import { Contato } from './contato.entity';

export type PessoaProps = Omit<
  PessoaModel,
  'dataInclusao' | 'contato' | 'id'
> & {
  contato?: ContatoModel;
  id?: string;
};

export class Pessoa extends Entity {
  private _nome!: string;
  private _dataNascimento!: Date;
  private _contato?: Contato;

  constructor({ nome, dataNascimento, id }: PessoaProps) {
    super({ id });
    this._nome = nome;
    this._dataNascimento = new Date(dataNascimento);
  }

  get nome(): string {
    return this._nome;
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  get contato(): Contato {
    if (!this._contato) {
      throw new Error('Contato nao encontrado!');
    }
    return this._contato;
  }

  set contato(contato: Contato) {
    this._contato = contato;
  }

  static fromModel({ contato, dataNascimento, id, nome }: PessoaModel): Pessoa {
    const pessoa = new Pessoa({ dataNascimento, id, nome });

    if (contato) {
      pessoa.contato = Contato.fromModel(contato);
    }

    return pessoa;
  }
}
