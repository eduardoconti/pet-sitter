import { ServicoModel } from '@pet-sitter/domain/models';

import {
  Alimentacao,
  Hospedagem,
  Limpeza,
  Passeio,
  Servico,
} from '../entities';
import { TipoServicoEnum } from '../enums';

export class ServicoEntityFactory {
  static create({
    id,
    idPetSitter,
    tipoServico,
  }: Omit<ServicoModel, 'dataInclusao' | 'id'> & { id?: number }): Servico {
    if (tipoServico === TipoServicoEnum.ALIMENTACAO) {
      return new Alimentacao({ id, idPetSitter, valorPorVisita: 0 });
    }

    if (tipoServico === TipoServicoEnum.HOSPEDAGEM) {
      return new Hospedagem({ id, idPetSitter, valorDiaria: 0 });
    }

    if (tipoServico === TipoServicoEnum.LIMPEZA) {
      return new Limpeza({ id, idPetSitter, valorPorVisita: 0 });
    }

    if (tipoServico === TipoServicoEnum.PASSEIO) {
      return new Passeio({ id, idPetSitter, valorPorHora: 0 });
    }

    throw new Error('Servico invalido');
  }
}
