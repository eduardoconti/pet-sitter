import { BaseException } from '@core/base-exception';

import { ErroInternoPetEnum } from '../enums';

export const temperamentoPetInvalidoMessage =
  'Nome do pet deve ser maior que 1 e menor que 128 carcateres';

export class TemperamentoPetException extends BaseException {
  codigoInterno = ErroInternoPetEnum.TEMPERAMENTO_INVALIDO;
  private constructor(message: string) {
    super(message);
  }

  static invalido(): TemperamentoPetException {
    return new TemperamentoPetException(temperamentoPetInvalidoMessage);
  }
}
