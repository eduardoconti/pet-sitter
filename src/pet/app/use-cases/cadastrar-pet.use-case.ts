import { PetEntity } from '@pet/domain/entities';
import { IPetRepository } from '@pet/domain/repositories';
import {
  CadastrarPetUseCaseInput,
  CadastrarPetUseCaseOutput,
  ICadastrarPetUseCase,
} from '@pet/domain/use-cases';

export class CadastrarPetUseCase implements ICadastrarPetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async executar(
    input: CadastrarPetUseCaseInput,
  ): Promise<CadastrarPetUseCaseOutput> {
    const pet = PetEntity.create(input);
    const { id, nome, temperamento } = await this.petRepository.save(
      PetEntity.toModel(pet),
    );
    return { id, nome, temperamento };
  }
}
