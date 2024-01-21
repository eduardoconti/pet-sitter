import { Entity } from '@core/entity';

import { ContatoModel } from '@usuario/models';

export type ContatoProps = Omit<ContatoModel, 'dataInclusao' | 'id'> & {
  id?: string;
};

export class Contato extends Entity {
  // private _email!: string;
  private _telefone!: string;

  private constructor({ id, telefone }: ContatoProps) {
    super({ id });
    this._telefone = telefone;
  }

  get telefone(): string {
    return this._telefone;
  }

  static fromModel({ id, telefone }: ContatoModel): Contato {
    return new Contato({ id, telefone });
  }
}
