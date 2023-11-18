import { ValueObject } from '@core/value-object';
import { Periodo } from '@core/value-objects';
import { isDate } from 'util/types';

interface DisponibilidadeProps {
  dia: Date;
  periodos: Periodo[];
}

export class Disponibilidade extends ValueObject<DisponibilidadeProps> {
  private constructor(props: DisponibilidadeProps) {
    super(props);
  }

  get value(): DisponibilidadeProps {
    return this.props;
  }

  static create({ dia, periodos }: DisponibilidadeProps): Disponibilidade {
    if (!isDate(dia)) {
      throw new Error('dia invalido');
    }

    if (!periodos || !Array.isArray(periodos) || !periodos.length) {
      throw new Error('necessario ao menos um periodo');
    }

    return new Disponibilidade({
      dia,
      periodos,
    });
  }
}
