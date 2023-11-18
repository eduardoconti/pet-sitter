import { ValueObject } from '@core/value-object';

import { TemperamentoPetEnum } from '../enums';
import { TemperamentoPetException } from '../exceptions';

interface TemperamentoPetProps {
  value: TemperamentoPetEnum;
}

export class TemperamentoPet extends ValueObject<TemperamentoPetProps> {
  private constructor(props: TemperamentoPetProps) {
    super(props);
  }

  get value(): TemperamentoPetEnum {
    return this.props.value;
  }

  static create(nome: TemperamentoPetEnum): TemperamentoPet {
    if (!Object.values(TemperamentoPetEnum).includes(nome)) {
      throw TemperamentoPetException.invalido();
    }
    return new TemperamentoPet({ value: nome });
  }
}
