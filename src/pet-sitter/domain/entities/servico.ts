import { Centavos, IPeriodo } from '@core/contracts';
import { TipoServicoEnum } from '../enums';
import { Disponibilidade } from '../value-objects';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

export type ServicoConstructorProps = {
  id: UUID;
  disponibilidade: Disponibilidade;
};
export abstract class Servico extends Entity {
  protected abstract _tipoServico: TipoServicoEnum;
  private _disponibilidade!: Disponibilidade;

  constructor({ id, disponibilidade }: ServicoConstructorProps) {
    super({ id: id.value });
    this._disponibilidade = disponibilidade;
  }

  get disponibilidade(): Disponibilidade {
    return this._disponibilidade;
  }

  get tipoServico(): TipoServicoEnum {
    return this._tipoServico;
  }

  abstract calcularValor(periodo: IPeriodo[]): Centavos;
}
