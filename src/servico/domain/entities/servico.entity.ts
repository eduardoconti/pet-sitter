import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';

import { TipoServicoEnum } from '../enums';

export type ServicoConstructorProps = {
  id?: number;
  idPetSitter: number;
};
export abstract class Servico extends Entity<number> {
  private _idPetSitter!: number;
  protected abstract _tipoServico: TipoServicoEnum;

  constructor({ id, idPetSitter }: ServicoConstructorProps) {
    super({ id });
    this._idPetSitter = idPetSitter;
  }

  get tipoServico(): TipoServicoEnum {
    return this._tipoServico;
  }

  get idPetSitter(): number {
    return this._idPetSitter;
  }

  abstract valor(): Centavos;
}
