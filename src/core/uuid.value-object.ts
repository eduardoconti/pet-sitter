import { randomUUID } from 'crypto';

import { ValueObject } from './value-object';
interface UUIDProps {
  value: string;
}

export class UUID extends ValueObject<UUIDProps> {
  private constructor(props: UUIDProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(uuid: string): UUID {
    return new UUID({ value: uuid });
  }

  static generate(): UUID {
    return new UUID({ value: randomUUID() });
  }
}
