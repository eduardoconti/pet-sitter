import { ContatoModel, UsuarioModel } from 'src/usuario/models';

import { Entity } from '@core/entity';

import { Contato } from './contato.entity';

export type UsuarioProps = Omit<
  UsuarioModel,
  'dataInclusao' | 'contato' | 'id'
> & {
  contato?: ContatoModel;
  id?: string;
};

export class Usuario extends Entity {
  private _nome!: string;
  private _dataNascimento!: Date;
  private _contato?: Contato;

  constructor({ nome, dataNascimento, id }: UsuarioProps) {
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

  static fromModel({
    contato,
    dataNascimento,
    id,
    nome,
  }: UsuarioModel): Usuario {
    const usuario = new Usuario({ dataNascimento, id, nome });

    if (contato) {
      usuario.contato = Contato.fromModel(contato);
    }

    return usuario;
  }
}
