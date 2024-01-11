import { BaseException } from '@core/base-exception';
import { HttpStatus } from '@nestjs/common';

export class IdempotencyException extends BaseException {
  codigoInterno!: 'IDEMPOTENCY';
  constructor() {
    super('Transacao em idempotencia');
  }

  statusHttp(): number {
    return HttpStatus.NO_CONTENT;
  }
}
