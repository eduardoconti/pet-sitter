import { ContatoModel } from 'src/usuario/models';

import { Entity } from '@core/entity';

export type ContatoProps = Omit<ContatoModel, 'dataInclusao' | 'id'> & {
  id?: string;
};

export class Contato extends Entity {
  private _email!: string;
  private _telefone!: string;

  private constructor({ id, email, telefone }: ContatoProps) {
    super({ id });
    (this._email = email), (this._telefone = telefone);
  }
  get email(): string {
    return this._email;
  }

  get telefone(): string {
    return this._telefone;
  }

  static fromModel({ id, email, telefone }: ContatoModel): Contato {
    return new Contato({ id, email, telefone });
  }
}
