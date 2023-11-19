import { Centavos, Segundos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico';

type PasseioConstructorProps = ServicoConstructorProps & {
  valorPorHora: Centavos;
  tempoMaximo: Segundos;
};

type CreatePasseioProps = Omit<PasseioConstructorProps, 'id'>;

export class Passeio extends Servico {
  protected _tipoServico = TipoServicoEnum.PASSEIO;
  private _valorPorHora!: Centavos;
  private _tempoMaximo!: Segundos;

  private constructor({ id, valorPorHora }: PasseioConstructorProps) {
    super({ id });
    this._valorPorHora = valorPorHora;
  }

  get valorHora(): Centavos {
    return this._valorPorHora;
  }

  get tempoMaximo(): Segundos {
    return this._tempoMaximo;
  }

  static create({ valorPorHora, tempoMaximo }: CreatePasseioProps) {
    return new Passeio({
      id: UUID.generate(),
      valorPorHora,
      tempoMaximo,
    });
  }

  calcularValor(horas: number): Centavos {
    return this.valorHora * horas;
  }
}
