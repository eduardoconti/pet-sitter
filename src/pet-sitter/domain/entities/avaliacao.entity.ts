import { Entity } from '@core/entity';

import { AvaliacaoModel } from '../models/avaliacao.model';

export type CreateAvaliacaoEntityProps = Omit<AvaliacaoModel, 'dataInclusao'>;

export class Avaliacao extends Entity<number> {
  private _idPetSitter!: number;
  private _idTutor!: number;
  private _rating!: number;
  private _descricao?: string;

  constructor({
    id,
    idPetSitter,
    idTutor,
    rating,
    descricao,
  }: CreateAvaliacaoEntityProps) {
    super({ id });
    this._idPetSitter = idPetSitter;
    this._idTutor = idTutor;
    this._rating = rating;
    this._descricao = descricao;
  }
  get idPetSitter(): number {
    return this._idPetSitter;
  }

  get idTutor() {
    return this._idTutor;
  }

  get rating() {
    return this._rating;
  }

  get descricao() {
    return this._descricao;
  }
}
