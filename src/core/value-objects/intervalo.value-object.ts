import { IPeriodo } from '@core/contracts';
import { PeriodoUtil } from '@core/utils';

import { Data } from './data.value-object';
import { Periodo } from './periodo.value-object';

type PeriodoProps = {
  dataInicio: Data;
  dataFim: Data;
};

export class Intervalo extends Periodo {
  private constructor(props: PeriodoProps) {
    super(props);
  }

  static create(input?: IPeriodo): Periodo {
    if (!input || !input.inicio || !input.fim) {
      throw new Error('Intervalo invalido');
    }
    const { inicio, fim } = input;
    const dataInicio = Data.create(inicio);
    const dataFim = Data.create(fim);

    const intervalo = new Intervalo({
      dataInicio: dataInicio,
      dataFim: dataFim,
    });

    if (!PeriodoUtil.isMesmoDia(intervalo.periodo)) {
      throw new Error('Intervalo de horas com datas diferentes');
    }

    return intervalo;
  }
}
