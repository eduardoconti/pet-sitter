import { Centavos, IPeriodo } from '@core/contracts';
import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico';
import { PeriodoUtil } from '@core/utils';
import { Disponibilidade } from '../value-objects';
import { UUID } from '@core/uuid.value-object';

type PasseioConstructorProps = ServicoConstructorProps & {
  valorPorHora: Centavos;
};

type CreatePasseioProps = {
  disponibilidade: Disponibilidade;
  valorPorHora: Centavos;
};

export class Passeio extends Servico {
  protected _tipoServico = TipoServicoEnum.PASSEIO;
  private _valorPorHora!: Centavos;

  private constructor({
    id,
    disponibilidade,
    valorPorHora,
  }: PasseioConstructorProps) {
    super({ id, disponibilidade });
    this._valorPorHora = valorPorHora;
  }
  get valorHora(): Centavos {
    return this._valorPorHora;
  }

  calcularValor(periodo: IPeriodo[]): Centavos {
    let horas = periodo.reduce((acc, item) => {
      return (acc += PeriodoUtil.horasEntrePeriodo(item));
    }, 0);

    if (horas <= 0) {
      horas = 1;
    }

    return this.valorHora * horas;
  }

  static create({ disponibilidade, valorPorHora }: CreatePasseioProps) {
    return new Passeio({
      id: UUID.generate(),
      disponibilidade,
      valorPorHora,
    });
  }
}
