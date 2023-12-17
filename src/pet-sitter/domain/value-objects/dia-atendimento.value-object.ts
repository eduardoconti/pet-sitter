import { ValueObject } from '@core/value-object';
import { Periodo } from '@core/value-objects';
import { Data } from '@core/value-objects/data.value-object';

interface DiaAgendamentoProps {
  dia: Data;
  periodos: Periodo[];
}

export class DiaAgendamento extends ValueObject<DiaAgendamentoProps> {
  private constructor(props: Omit<DiaAgendamentoProps, 'periodos'>) {
    super({ ...props, periodos: [] });
  }

  get value(): DiaAgendamentoProps {
    return this.props;
  }

  get dia(): Data {
    return this.props.dia;
  }

  get periodos(): Periodo[] {
    return this.props.periodos;
  }

  static create(input?: Omit<DiaAgendamentoProps, 'periodos'>): DiaAgendamento {
    if (!input || !input.dia) {
      throw new Error('Dia agendamento invalido');
    }

    const { dia } = input;

    return new DiaAgendamento({
      dia,
    });
  }

  adicionaPeriodo(periodo: Periodo) {
    if (this.periodos?.length > 6) {
      throw new Error('maximo de peridos por dia');
    }
    this.periodos?.push(periodo);
  }
}
