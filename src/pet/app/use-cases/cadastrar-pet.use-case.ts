import { PetEntity, PetEntityProps } from '@pet/domain/entities';
import {
  CadastrarPetUseCaseInput,
  ICadastrarPetUseCase,
} from '@pet/domain/use-cases';

export class CadastrarPetUseCase implements ICadastrarPetUseCase {
  executar(input: CadastrarPetUseCaseInput): Promise<PetEntityProps> {
    const pet = PetEntity.create(input);
    return Promise.resolve({
      id: pet.id,
      nome: pet.nome,
    });
  }
}
