import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

import { TipoServicoEnum } from '../enums';

export type ServicoConstructorProps = {
  id: UUID;
  idPetSitter: UUID;
};
export abstract class Servico extends Entity {
  private _idPetSitter!: UUID;
  protected abstract _tipoServico: TipoServicoEnum;

  constructor({ id, idPetSitter }: ServicoConstructorProps) {
    super({ id: id.value });
    this._idPetSitter = idPetSitter;
  }

  get tipoServico(): TipoServicoEnum {
    return this._tipoServico;
  }

  get idPetSitter(): UUID {
    return this._idPetSitter;
  }

  abstract valor(): Centavos;
}
