import { PetEntity, PetEntityProps } from '@pet/domain/entities';
import { IPetRepository } from '@pet/domain/repositories';
import {
  CadastrarPetUseCaseInput,
  ICadastrarPetUseCase,
} from '@pet/domain/use-cases';

export class CadastrarPetUseCase implements ICadastrarPetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async executar(input: CadastrarPetUseCaseInput): Promise<PetEntityProps> {
    const pet = PetEntity.create(input);
    const { id, nome } = await this.petRepository.save(PetEntity.toModel(pet));
    return { id, nome };
  }
}
