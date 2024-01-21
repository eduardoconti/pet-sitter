import { PetSitter } from '@pet-sitter/domain/entities';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import {
  PreCadastroPetSitterUseCaseInput,
  PreCadastroPetSitterUseCaseOutput,
  IPreCadastroPetSitterUseCase,
} from '@pet-sitter/domain/use-cases';

import { IHash } from '@core/contracts';

export class PreCadastroPetSitterUseCase
  implements IPreCadastroPetSitterUseCase
{
  constructor(
    private readonly petSitterRepository: IPetSitterRepository,
    private readonly passwordHash: IHash,
  ) {}

  async executar(
    input: PreCadastroPetSitterUseCaseInput,
  ): Promise<PreCadastroPetSitterUseCaseOutput> {
    const pet = PetSitter.preCadastro(input);
    const {
      usuario: { nome, dataNascimento, id, email, sobreNome },
    } = await this.petSitterRepository.save({
      usuario: {
        nome: pet.nome,
        email: pet.email,
        senha: await this.passwordHash.hash(pet.senha),
        dataNascimento: pet.dataNascimento,
        dataInclusao: new Date().toISOString(),
        sobreNome: pet.sobreNome,
      },
    });
    return { id, nome, email, dataNascimento, sobreNome };
  }
}
