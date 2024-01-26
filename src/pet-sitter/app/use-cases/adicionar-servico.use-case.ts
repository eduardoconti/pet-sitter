import {
  IPetSitterRepository,
  IServicoRepository,
} from '@pet-sitter/domain/repositories';

import {
  AdicionarServicoUseCaseInput,
  IAdicionarServicoUseCase,
} from '@pet-sitter/domain/use-cases';

export class AdicionarServicoUseCase implements IAdicionarServicoUseCase {
  constructor(
    private readonly petSitterRepository: IPetSitterRepository,
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async executar({
    idUsuario,
    tipoServico,
  }: AdicionarServicoUseCaseInput): Promise<void> {
    const petSitterModel = await this.petSitterRepository.get(idUsuario);
    await this.servicoRepository.save({
      idPetSitter: petSitterModel.id,
      tipoServico,
    });
  }
}
