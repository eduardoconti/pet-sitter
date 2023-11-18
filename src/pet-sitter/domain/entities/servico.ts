import { Centavos, IPeriodo } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';

import { TipoServicoEnum } from '../enums';

export type ServicoConstructorProps = {
  id: UUID;
};
export abstract class Servico extends Entity {
  protected abstract _tipoServico: TipoServicoEnum;

  constructor({ id }: ServicoConstructorProps) {
    super({ id: id.value });
  }

  get tipoServico(): TipoServicoEnum {
    return this._tipoServico;
  }

  abstract calcularValor(periodo: IPeriodo[]): Centavos;
}
