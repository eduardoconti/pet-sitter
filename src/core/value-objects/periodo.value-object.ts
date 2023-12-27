import { IPeriodo } from '@core/contracts';
import { Conversao } from '@core/utils/conversao-util';
import { ValueObject } from '@core/value-object';

import { Data } from './data.value-object';

type PeriodoProps = {
  dataInicio: Data;
  dataFim: Data;
};
export class Periodo extends ValueObject<PeriodoProps> {
  constructor(props: PeriodoProps) {
    super(props);

    if (props.dataInicio.getTime() > props.dataFim.getTime()) {
      throw new Error('Data inicio maior que data fim');
    }
  }

  get periodo(): IPeriodo {
    return { inicio: this.dataInicio.value, fim: this.dataFim.value };
  }

  get dataInicio(): Data {
    return this.props.dataInicio;
  }

  get dataFim(): Data {
    return this.props.dataFim;
  }

  static create(input?: IPeriodo): Periodo {
    if (!input || !input.inicio || !input.fim) {
      throw new Error('Periodo invalido');
    }
    const { inicio, fim } = input;

    const dataInicio = Data.create(inicio);
    const dataFim = Data.create(fim);

    return new Periodo({
      dataInicio: dataInicio,
      dataFim: dataFim,
    });
  }

  horasEntrePeriodo(): number {
    const diferencaEmMilisegundos =
      this.dataFim.getTime() - this.dataInicio.getTime();
    if (!diferencaEmMilisegundos) {
      return 1;
    }
    const diferencaEmHoras = Conversao.msToHr(diferencaEmMilisegundos);
    return Math.ceil(diferencaEmHoras);
  }

  diasEntrePeriodo(): number {
    return Math.ceil(this.horasEntrePeriodo() / 24);
  }
}
