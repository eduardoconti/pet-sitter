import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

type LocalAtendimentoConstructorProps = {
  id?: UUID;
  idCidade: number;
  idRegiaoAtendimento?: number;
  raioAtendimento?: number;
};
export class LocalAtendimento extends Entity {
  private _idCidade!: number;
  private _idRegiaoAtendimento?: number;
  private _raioAtendimento?: number;

  private constructor({
    id,
    idCidade,
    idRegiaoAtendimento,
    raioAtendimento,
  }: LocalAtendimentoConstructorProps) {
    super({ id: id?.value });
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
  }: Omit<LocalAtendimentoConstructorProps, 'id'>): LocalAtendimento {
    return new LocalAtendimento({
      idCidade,
      idRegiaoAtendimento,
      raioAtendimento,
    });
  }
}
