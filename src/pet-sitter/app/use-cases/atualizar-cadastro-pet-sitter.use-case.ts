import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import {
  AtualizarCadastroPetSitterUseCaseInput,
  AtualizarCadastroPetSitterUseCaseOutput,
  IAtualizarCadastroPetSitterUseCase,
} from '@pet-sitter/domain/use-cases';

export class AtualizarCadastroPetSitterUseCase
  implements IAtualizarCadastroPetSitterUseCase
{
  constructor(private readonly petSitterRepository: IPetSitterRepository) {}

  async executar({
    id,
    idPetSitter,
    nome,
    dataNascimento,
    sobreNome,
    bio,
  }: AtualizarCadastroPetSitterUseCaseInput): Promise<AtualizarCadastroPetSitterUseCaseOutput> {
    await this.petSitterRepository.update({
      id: idPetSitter as number,
      bio,
      usuario: { nome, dataNascimento, sobreNome, id },
    });

    return { id, nome, dataNascimento, sobreNome, idPetSitter };
  }
}
