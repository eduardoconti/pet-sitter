import { PetSitter } from '@pet-sitter/domain/entities';
import { PetSitterModel } from '@pet-sitter/domain/models';

export class PetSitterEntityMapper {
  static toEntity({
    id,
    bio,
    usuario,
  }: Omit<PetSitterModel, 'idUsuario' | 'dataInclusao'>): PetSitter {
    return new PetSitter({
      idPetSitter: id,
      id: usuario.id,
      dataNascimento: usuario.dataNascimento,
      email: usuario.email,
      nome: usuario.nome,
      senha: usuario.senha,
      sobreNome: usuario.sobreNome,
      status: usuario.status,
      bio,
    });
  }
}
