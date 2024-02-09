import { Centavos } from '@core/contracts';

import { TipoServicoEnum } from '../enums';
import { Servico, ServicoConstructorProps } from './servico.entity';

type HospedagemConstructorProps = ServicoConstructorProps & {
  valorDiaria: Centavos;
};

type CreateHospedagemProps = Omit<HospedagemConstructorProps, 'id'>;

export class Hospedagem extends Servico {
  protected _tipoServico = TipoServicoEnum.HOSPEDAGEM;
  private readonly _valorDiaria!: Centavos;

  constructor({ id, valorDiaria, idPetSitter }: HospedagemConstructorProps) {
    super({ id, idPetSitter });
    this._valorDiaria = valorDiaria;
  }

  static create({ valorDiaria, idPetSitter }: CreateHospedagemProps) {
    return new Hospedagem({
      valorDiaria,
      idPetSitter,
    });
  }

  valor(): Centavos {
    return this._valorDiaria;
  }
}
