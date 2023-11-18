import { IPeriodo } from '@core/contracts';
import { ValueObject } from '@core/value-object';
import { isDate } from 'util/types';

export class Periodo extends ValueObject<IPeriodo> {
  private constructor(props: IPeriodo) {
    super(props);
  }

  get value(): IPeriodo {
    return this.props;
  }

  static create({ inicio, fim }: IPeriodo): Periodo {
    if (!isDate(inicio)) {
      throw new Error('Data inicio invalida');
    }

    if (!isDate(fim)) {
      throw new Error('Data fim invalida');
    }

    if (inicio.getTime() > fim.getTime()) {
      throw new Error('Data inicio maior que data fim');
    }

    return new Periodo({
      inicio,
      fim,
    });
  }
}
