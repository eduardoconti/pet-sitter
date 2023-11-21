import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico';

type AlimentacaoConstructorProps = ServicoConstructorProps & {
  valorPorVisita: Centavos;
  frequenciaMaxima: number;
};

type CreateAlimentacaoProps = Omit<AlimentacaoConstructorProps, 'id'>;
export class Alimentacao extends Servico {
  protected _tipoServico = TipoServicoEnum.ALIMENTACAO;
  private _valorPorVisita!: Centavos;
  private _frequenciaMaxima!: number;

  private constructor({
    id,
    valorPorVisita,
    idPetSitter,
    frequenciaMaxima,
  }: AlimentacaoConstructorProps) {
    super({ id, idPetSitter });
    this._valorPorVisita = valorPorVisita;
    this._frequenciaMaxima = frequenciaMaxima;
  }

  get valorVisita(): Centavos {
    return this._valorPorVisita;
  }

  get frenquenciaMaxima(): number {
    return this._frequenciaMaxima;
  }

  static create({
    valorPorVisita,
    frequenciaMaxima,
    idPetSitter,
  }: CreateAlimentacaoProps) {
    return new Alimentacao({
      id: UUID.generate(),
      valorPorVisita,
      frequenciaMaxima,
      idPetSitter,
    });
  }

  calcularValor(frequencia: number): Centavos {
    return this.valorVisita * frequencia;
  }
}
