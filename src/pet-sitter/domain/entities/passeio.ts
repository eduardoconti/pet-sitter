import { Centavos, IPeriodo } from '@core/contracts';
import { PeriodoUtil } from '@core/utils';
import { UUID } from '@core/uuid.value-object';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico';

type PasseioConstructorProps = ServicoConstructorProps & {
  valorPorHora: Centavos;
};

type CreatePasseioProps = {
  valorPorHora: Centavos;
};

export class Passeio extends Servico {
  protected _tipoServico = TipoServicoEnum.PASSEIO;
  private _valorPorHora!: Centavos;

  private constructor({
    id,

    valorPorHora,
  }: PasseioConstructorProps) {
    super({ id });
    this._valorPorHora = valorPorHora;
  }

  get valorHora(): Centavos {
    return this._valorPorHora;
  }

  static create({ valorPorHora }: CreatePasseioProps) {
    return new Passeio({
      id: UUID.generate(),
      valorPorHora,
    });
  }

  calcularValor(periodo: IPeriodo[]): Centavos {
    let horas = periodo.reduce((acc, item) => {
      return (acc += PeriodoUtil.horasEntrePeriodo(item));
    }, 0);

    if (horas <= 0) {
      horas = 1;
    }

    return this.valorHora * horas;
  }
}
