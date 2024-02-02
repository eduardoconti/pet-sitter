import {
  ILocalAtendimentoRepository,
  IPetSitterRepository,
} from '@pet-sitter/domain/repositories';
import {
  AdicionarLocalAtendimentoUseCaseInput,
  IAdicionarLocalAtendimentoUseCase,
} from '@pet-sitter/domain/use-cases';

export class AdicionarLocalAtendimentoUseCase
  implements IAdicionarLocalAtendimentoUseCase
{
  constructor(
    private readonly petSitterRepository: IPetSitterRepository,
    private readonly localAtendimentoRepository: ILocalAtendimentoRepository,
  ) {}

  async executar({
    idCidade,
    idUsuario,
    idRegiao,
  }: AdicionarLocalAtendimentoUseCaseInput): Promise<void> {
    const petSitterModel = await this.petSitterRepository.get(idUsuario);
    await this.localAtendimentoRepository.save({
      idPetSitter: petSitterModel.id,
      idCidade,
      idRegiao: idRegiao ?? null,
    });
  }
}
