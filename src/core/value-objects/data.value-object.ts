import { ValueObject } from '@core/value-object';

export class Data extends ValueObject<Date> {
  private constructor(props: Date) {
    super(props);
  }

  get value(): Date {
    return this.props;
  }

  static create(input?: Date | number | string): Data {
    if (!input) {
      throw new Error('Data invalida');
    }
    const data = new Date(input);

    if (isNaN(data.getTime())) {
      throw new Error('Data invalida');
    }

    return new Data(data);
  }

  getTime(): number {
    return this.value.getTime();
  }
}
