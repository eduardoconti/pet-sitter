import { IPeriodo } from '@core/contracts';
import { ValueObject } from '@core/value-object';
import { isDate } from 'util/types';

interface DisponibilidadeProps {
  dia: Date;
  periodos: IPeriodo[];
}

export class Disponibilidade extends ValueObject<DisponibilidadeProps> {
  get value(): DisponibilidadeProps {
    return this.props;
  }

  private constructor(props: DisponibilidadeProps) {
    super(props);
  }

  static create({ dia, periodos }: DisponibilidadeProps): Disponibilidade {
    if (!isDate(dia)) {
      throw new Error('dia invalido');
    }

    if (!periodos || !Array.isArray(periodos) || !periodos.length) {
      throw new Error('necessario ao menos um periodo');
    }

    periodos.forEach((periodo) => {
      if (periodo.inicio.getTime() > periodo.fim.getTime()) {
        throw new Error('Data inicio maior que data fim');
      }
    });

    return new Disponibilidade({
      dia,
      periodos,
    });
  }
}
