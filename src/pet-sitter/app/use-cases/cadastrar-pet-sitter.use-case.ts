import { PetSitter } from '@pet-sitter/domain/entities';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import {
  CadastrarPetSitterUseCaseInput,
  CadastrarPetSitterUseCaseOutput,
  ICadastrarPetSitterUseCase,
} from '@pet-sitter/domain/use-cases';

export class CadastrarPetSitterUseCase implements ICadastrarPetSitterUseCase {
  constructor(private readonly petRepository: IPetSitterRepository) {}

  async executar(
    input: CadastrarPetSitterUseCaseInput,
  ): Promise<CadastrarPetSitterUseCaseOutput> {
    const pet = PetSitter.create(input);
    const { id, nome, dataNascimento } = await this.petRepository.save(
      PetSitter.toModel(pet),
    );
    return { id, nome, dataNascimento };
  }
}
