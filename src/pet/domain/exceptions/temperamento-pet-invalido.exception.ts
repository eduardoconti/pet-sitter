import { BaseException } from '@core/base-exception';

import { ErroInternoPetEnum } from '../enums';

export const temperamentoPetInvalidoMessage = 'Temperamento deve ser D ou A';

export class TemperamentoPetException extends BaseException {
  codigoInterno = ErroInternoPetEnum.TEMPERAMENTO_INVALIDO;
  private constructor(message: string) {
    super(message);
  }

  static invalido(): TemperamentoPetException {
    return new TemperamentoPetException(temperamentoPetInvalidoMessage);
  }

  override statusHttp(): number {
    return 400;
  }
}
