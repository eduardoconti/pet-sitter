import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

type AtendimentoConstructorProps = {
  id: UUID;
  idCidade: number;
  idRegiaoAtendimento?: number;
  raioAtendimento?: number;
};
export class Atendimento extends Entity {
  private _idCidade!: number;
  private _idRegiaoAtendimento?: number;
  private _raioAtendimento?: number;

  private constructor({
    id,
    idCidade,
    idRegiaoAtendimento,
    raioAtendimento,
  }: AtendimentoConstructorProps) {
    super({ id: id.value });
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
  }: Omit<AtendimentoConstructorProps, 'id'>): Atendimento {
    return new Atendimento({
      id: UUID.generate(),
      idCidade,
      idRegiaoAtendimento,
      raioAtendimento,
    });
  }
}
