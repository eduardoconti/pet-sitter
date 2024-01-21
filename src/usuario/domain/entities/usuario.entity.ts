import { Entity } from '@core/entity';

import { ContatoModel, UsuarioModel } from '@usuario/models';

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
  private _email!: string;
  private _senha!: string;
  private _sobreNome!: string;

  constructor({
    nome,
    dataNascimento,
    id,
    email,
    senha,
    sobreNome,
  }: UsuarioProps) {
    super({ id });
    this._nome = nome;
    this._dataNascimento = new Date(dataNascimento);
    this._email = email;
    this._senha = senha;
    this._sobreNome = sobreNome;
  }

  get nome(): string {
    return this._nome;
  }

  get sobreNome(): string {
    return this._sobreNome;
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  get email(): string {
    return this._email;
  }

  get senha(): string {
    return this._senha;
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

  // static fromModel({
  //   contato,
  //   dataNascimento,
  //   id,
  //   nome,
  //   email,
  //   senha,
  // }: UsuarioModel): Usuario {
  //   const usuario = new Usuario({ dataNascimento, id, nome, email, senha });

  //   if (contato) {
  //     usuario.contato = Contato.fromModel(contato);
  //   }

  //   return usuario;
  // }
}
