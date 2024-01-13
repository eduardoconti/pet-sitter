import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@core/base-exception';

export class IdempotencyException extends BaseException {
  codigoInterno!: 'IDEMPOTENCY';
  constructor() {
    super('Transacao em idempotencia');
  }

  statusHttp(): number {
    return HttpStatus.NO_CONTENT;
  }
}
