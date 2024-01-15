import { Entity } from '@core/entity';

type LocalAtendimentoConstructorProps = {
  id?: number;
  idCidade: number;
  idRegiaoAtendimento?: number;
  idPetSitter: number;
};
export class LocalAtendimento extends Entity<number> {
  private _idCidade!: number;
  private _idRegiaoAtendimento?: number;

  private constructor({
    id,
    idCidade,
    idRegiaoAtendimento,
  }: LocalAtendimentoConstructorProps) {
    super({ id });
    this._idCidade = idCidade;
    this._idRegiaoAtendimento = idRegiaoAtendimento;
  }

  get idCidade(): number {
    return this._idCidade;
  }

  get idRegiaoAtendimento(): number | undefined {
    return this._idRegiaoAtendimento;
  }

  static create({
    idCidade,
    idRegiaoAtendimento,
    idPetSitter,
  }: Omit<LocalAtendimentoConstructorProps, 'id'>): LocalAtendimento {
    return new LocalAtendimento({
      idCidade,
      idRegiaoAtendimento,
      idPetSitter,
    });
  }
}
