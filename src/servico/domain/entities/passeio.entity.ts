import { Centavos } from '@core/contracts';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico.entity';

type PasseioConstructorProps = ServicoConstructorProps & {
  valorPorHora: Centavos;
};

type CreatePasseioProps = Omit<PasseioConstructorProps, 'id'>;

export class Passeio extends Servico {
  protected _tipoServico = TipoServicoEnum.PASSEIO;
  private readonly _valorHora!: Centavos;

  constructor({ id, valorPorHora, idPetSitter }: PasseioConstructorProps) {
    super({ id, idPetSitter });
    this._valorHora = valorPorHora;
  }

  static create({ valorPorHora, idPetSitter }: CreatePasseioProps) {
    return new Passeio({
      valorPorHora,
      idPetSitter,
    });
  }

  valor(): Centavos {
    return this._valorHora;
  }
}
