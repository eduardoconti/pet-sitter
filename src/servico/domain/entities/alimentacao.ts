import { Centavos } from '@core/contracts';
import { Periodo } from '@core/value-objects';

import { TipoServicoEnum } from '../enums';
import { Servico } from './servico';

export class Alimentacao extends Servico {
  protected _tipoServico = TipoServicoEnum.ALIMENTACAO;
  private _valorPorVisita!: Centavos;
  private _frequenciaMaxima!: number;

  get valorVisita(): Centavos {
    return this._valorPorVisita;
  }

  get frenquenciaMaxima(): number {
    return this._frequenciaMaxima;
  }

  calcularValor(periodo: Periodo[]): Centavos {
    const quantidadeVisitas = periodo.length;

    return this.valorVisita * quantidadeVisitas;
  }
}
