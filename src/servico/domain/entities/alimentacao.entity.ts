import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico.entity';

type AlimentacaoConstructorProps = ServicoConstructorProps & {
  valorPorVisita: Centavos;
};

type CreateAlimentacaoProps = Omit<AlimentacaoConstructorProps, 'id'>;
export class Alimentacao extends Servico {
  protected _tipoServico = TipoServicoEnum.ALIMENTACAO;
  private _valorPorVisita!: Centavos;

  private constructor({
    id,
    valorPorVisita,
    idPetSitter,
  }: AlimentacaoConstructorProps) {
    super({ id, idPetSitter });
    this._valorPorVisita = valorPorVisita;
  }

  get valorVisita(): Centavos {
    return this._valorPorVisita;
  }

  static create({ valorPorVisita, idPetSitter }: CreateAlimentacaoProps) {
    return new Alimentacao({
      id: UUID.generate(),
      valorPorVisita,

      idPetSitter,
    });
  }

  valor(): Centavos {
    return this.valorVisita;
  }
}
