import { PetSitter } from '@pet-sitter/domain/entities';
import { PetSitterModel } from '@pet-sitter/domain/models';

export class PetSitterEntityMapper {
  static toEntity({ id, usuario }: PetSitterModel): PetSitter {
    return new PetSitter({
      idPetSitter: id,
      id: usuario.id,
      dataNascimento: usuario.dataNascimento,
      email: usuario.email,
      nome: usuario.nome,
      senha: '',
    });
  }
}
