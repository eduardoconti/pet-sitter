import { ValueObject } from '@core/value-object';
import { Intervalo } from '@core/value-objects';
import { Data } from '@core/value-objects/data.value-object';

interface DiaAtendimentoProps {
  dia: Data;
  intervalos: Intervalo[];
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

  get intervalos(): Intervalo[] {
    return this.props.intervalos;
  }

  static create(input?: DiaAtendimentoProps): DiaAtendimento {
    if (
      !input ||
      !input.dia ||
      !input.intervalos ||
      !Array.isArray(input.intervalos)
    ) {
      throw new Error('Dia atendimento invalido');
    }

    const { dia, intervalos } = input;
    if (!intervalos.length) {
      throw new Error('Necessario ao menos um intervalo de horas');
    }

    return new DiaAtendimento({
      dia,
      intervalos,
    });
  }
}
