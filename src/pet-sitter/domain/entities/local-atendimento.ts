import { Entity } from '@core/entity';

type LocalAtendimentoConstructorProps = {
  id?: number;
  idCidade: number;
  idRegiaoAtendimento?: number;
  raioAtendimento?: number;
  idPetSitter: number;
};
export class LocalAtendimento extends Entity<number> {
  private _idCidade!: number;
  private _idRegiaoAtendimento?: number;
  private _raioAtendimento?: number;

  private constructor({
    id,
    idCidade,
    idRegiaoAtendimento,
    raioAtendimento,
  }: LocalAtendimentoConstructorProps) {
    super({ id });
    this._idCidade = idCidade;
    this._idRegiaoAtendimento = idRegiaoAtendimento;
    this._raioAtendimento = raioAtendimento;
  }

  get idCidade(): number {
    return this._idCidade;
  }

  get idRegiaoAtendimento(): number | undefined {
    return this._idRegiaoAtendimento;
  }

  get raioAtendimento(): number | undefined {
    return this._raioAtendimento;
  }

  static create({
    idCidade,
    idRegiaoAtendimento,
    raioAtendimento,
    idPetSitter,
  }: Omit<LocalAtendimentoConstructorProps, 'id'>): LocalAtendimento {
    return new LocalAtendimento({
      idCidade,
      idRegiaoAtendimento,
      raioAtendimento,
      idPetSitter,
    });
  }
}
