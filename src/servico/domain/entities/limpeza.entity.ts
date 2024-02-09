import { Centavos } from '@core/contracts';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico.entity';

type LimpezaConstructorProps = ServicoConstructorProps & {
  valorPorVisita: Centavos;
};

type CreateLimpezaProps = Omit<LimpezaConstructorProps, 'id'>;
export class Limpeza extends Servico {
  protected _tipoServico = TipoServicoEnum.LIMPEZA;
  private _valorPorVisita!: Centavos;

  constructor({ id, valorPorVisita, idPetSitter }: LimpezaConstructorProps) {
    super({ id: id as number, idPetSitter });
    this._valorPorVisita = valorPorVisita;
  }

  get valorVisita(): Centavos {
    return this._valorPorVisita;
  }

  static create({ valorPorVisita, idPetSitter }: CreateLimpezaProps) {
    return new Limpeza({
      valorPorVisita,
      idPetSitter,
    });
  }

  valor(): Centavos {
    return this.valorVisita;
  }
}
