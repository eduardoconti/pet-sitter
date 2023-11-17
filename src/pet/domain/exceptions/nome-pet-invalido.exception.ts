import { BaseException } from '@core/base-exception';
import { ErroInternoPetEnum } from '../enums';

export const nomePetRangeInvalidoMessage =
  'Nome do pet deve ser maior que 1 e menor que 128 carcateres';

export const nomePetInvalidoMessage =
  'Nome do pet deve ser maior que 1 e menor que 128 carcateres';

export class NomePetException extends BaseException {
  codigoInterno = ErroInternoPetEnum.NOME_INVALIDO;
  private constructor(message: string) {
    super(message);
  }

  static rangeInvalido(): NomePetException {
    return new NomePetException(nomePetRangeInvalidoMessage);
  }

  static nomeInvalido(): NomePetException {
    return new NomePetException(nomePetInvalidoMessage);
  }
}
