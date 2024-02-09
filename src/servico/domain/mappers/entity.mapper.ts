import { ServicoModel } from '@pet-sitter/domain/models';

import { Servico } from '../entities';
import { ServicoEntityFactory } from '../factories/entity.factory';

export class ServicoEntityMapper {
  static toEntity({
    id,
    idPetSitter,
    tipoServico,
  }: Omit<ServicoModel, 'idUsuario' | 'dataInclusao'>): Servico {
    return ServicoEntityFactory.create({ id, idPetSitter, tipoServico });
  }
}
