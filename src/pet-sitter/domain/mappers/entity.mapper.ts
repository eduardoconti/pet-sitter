import { PetSitter } from '@pet-sitter/domain/entities';
import { PetSitterModel } from '@pet-sitter/domain/models';

import { ServicoEntityMapper } from '@servico/domain/mappers/entity.mapper';

export class PetSitterEntityMapper {
  static toEntity({
    id,
    bio,
    usuario,
    servicos,
  }: Omit<PetSitterModel, 'idUsuario' | 'dataInclusao'>): PetSitter {
    return new PetSitter({
      petSitter: { id } as PetSitterModel,
      id: usuario.id,
      dataNascimento: usuario.dataNascimento,
      email: usuario.email,
      nome: usuario.nome,
      senha: usuario.senha,
      sobreNome: usuario.sobreNome,
      status: usuario.status,
      bio,
      servicos: servicos?.map((e) => ServicoEntityMapper.toEntity(e)),
    });
  }
}
