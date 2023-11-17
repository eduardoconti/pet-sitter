import { Centavos, IPeriodo } from '@core/contracts';
import { TipoServicoEnum } from '../enums';
import { Servico } from './servico';

export class Alimentacao extends Servico {
  protected _tipoServico = TipoServicoEnum.ALIMENTACAO;
  private _valorPorVisita!: Centavos;

  get valorVisita(): Centavos {
    return this._valorPorVisita;
  }

  calcularValor(periodo: IPeriodo[]): Centavos {
    const quantidadeVisitas = periodo.length;

    return this.valorVisita * quantidadeVisitas;
  }
}
