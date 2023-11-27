import { ValueObject } from '@core/value-object';
import { Periodo } from '@core/value-objects';
import { Data } from '@core/value-objects/data.value-object';

interface DiaAtendimentoProps {
  dia: Data;
  periodos: Periodo[];
}

export class DiaAtendimento extends ValueObject<DiaAtendimentoProps> {
  private constructor(props: DiaAtendimentoProps) {
    super(props);
  }

  get value(): DiaAtendimentoProps {
    return this.props;
  }

  get dia(): Data {
    return this.props.dia;
  }

  get periodos(): Periodo[] {
    return this.props.periodos;
  }

  static create(input?: DiaAtendimentoProps): DiaAtendimento {
    if (
      !input ||
      !input.dia ||
      !input.periodos ||
      !Array.isArray(input.periodos)
    ) {
      throw new Error('Dia atendimento invalido');
    }

    const { dia, periodos } = input;
    if (!periodos.length) {
      throw new Error('Necessario ao menos um periodo');
    }

    return new DiaAtendimento({
      dia,
      periodos,
    });
  }
}
